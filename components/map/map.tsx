"use client";

import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
  useMap,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import PoiMarkers from "./poiMarkers";
import { Poi } from "@/lib/types";
import { useDispatch } from "react-redux";
import { mapActions } from "@/lib/store/mapSlice";
import { useLocalStorage } from "react-use";
import { zoomToLocation } from "@/lib/functions/helperFunctions";
import FloatingCursorPin from "./floatingCursorPin";
import useMapPinFloat from "@/lib/hooks/useMapPinFloat";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import useActivitiesFilter from "@/lib/hooks/useActvitiesFilter";
import MapLoadingLayout from "./mapLayoutLoading";
import Papa from "papaparse";
import { useTheme } from "next-themes";
import {
  MapPin,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Home,
} from "lucide-react";
import { toast } from "sonner";

interface MapProps {
  displayActivities?: boolean;
  mapHeight?: string;
  selectedActivity?: Poi[];
}

const GEORGIA_BOUNDS = {
  north: 43.59,
  south: 41.05,
  west: 40.01,
  east: 46.73,
};

const MapComponent: React.FC<MapProps> = ({
  displayActivities = true,
  mapHeight = "h-dvh md:min-h-[500px]",
  selectedActivity,
}) => {
  const map = useMap();
  const dispatch = useDispatch();
  const { isFloatingEnabled, latLng } = useSelector(
    (state: RootState) => state.map,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, _, removeValue] = useLocalStorage<Poi | null>("location", null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { cursorPos, clickedLatLng, mouseMoveHandler, onClickHandler } =
    useMapPinFloat(containerRef);

  const { activityLocations } = useActivitiesFilter();
  const [isLocating, setIsLocating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hasSetTbilisiRef = useRef(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!map) return;
    dispatch(mapActions.setMap(map));
  }, [dispatch, map]);

  // Ensure map is centered on Tbilisi on initial load
  useEffect(() => {
    if (!map || hasSetTbilisiRef.current || selectedActivity) return;

    // Set center and zoom to Tbilisi after a short delay to ensure map is ready
    // This ensures Tbilisi is shown by default before any fitBounds calls
    const timer = setTimeout(() => {
      if (map && !selectedActivity) {
        map.setCenter({ lat: 41.73809, lng: 44.7808 });
        map.setZoom(12);
        hasSetTbilisiRef.current = true;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [map, selectedActivity]);

  useEffect(() => {
    if (value && map) {
      zoomToLocation(map, value);
      // Use a ref to avoid dependency on removeValue
      const timeoutId = setTimeout(() => {
        removeValue();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, value]); // removeValue is stable from useLocalStorage, safe to omit

  // Center map and zoom when latLng changes (e.g., from address selection)
  useEffect(() => {
    if (latLng && map && !displayActivities) {
      map.setCenter(latLng);
      map.setZoom(16);
    }
  }, [latLng, map, displayActivities]);

  const handleLocateMe = useCallback(() => {
    if (!map) return;

    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(userLocation);
          map.setZoom(16);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
          toast.warning(
            "Unable to get your location. Please check your browser permissions.",
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    } else {
      setIsLocating(false);
      alert("Geolocation is not supported by your browser.");
    }
  }, [map]);

  const handleZoomIn = useCallback(() => {
    if (!map) return;
    const currentZoom = map.getZoom() || 12;
    map.setZoom(Math.min(currentZoom + 1, 20));
  }, [map]);

  const handleZoomOut = useCallback(() => {
    if (!map) return;
    const currentZoom = map.getZoom() || 12;
    map.setZoom(Math.max(currentZoom - 1, 6));
  }, [map]);

  const handleFullscreen = useCallback(() => {
    const mapContainer = containerRef.current;
    if (!mapContainer) return;

    if (!document.fullscreenElement) {
      mapContainer.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
        toast.error("Unable to enter fullscreen mode");
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Error attempting to exit fullscreen:", err);
      });
      setIsFullscreen(false);
    }
  }, []);

  const handleResetToTbilisi = useCallback(() => {
    if (!map) return;
    map.setCenter({ lat: 41.73809, lng: 44.7808 });
    map.setZoom(12);
    toast.success("Map reset to Tbilisi");
  }, [map]);

  // Apply map theme based on website theme
  // The mapId configured in Google Maps Console should have styles for both light and dark
  // This effect ensures the map refreshes when theme changes to apply the correct styles
  useEffect(() => {
    if (!map) return;

    // If you have different mapIds for light/dark themes in Google Maps Console,
    // you can switch them here. For example:
    // const mapId = resolvedTheme === "dark" ? "dark-map-id" : "light-map-id";
    // map.setMapTypeId(mapId);

    // Otherwise, the current mapId should handle both themes via console configuration
    // Force a refresh to ensure styles are applied
    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();
    if (currentCenter && currentZoom) {
      // Small refresh to trigger style reapplication
      map.setZoom(currentZoom);
    }
  }, [map, resolvedTheme]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    let polygon: google.maps.Polygon | null = null;
    if (!map) return;

    (async () => {
      try {
        const res = await fetch("/ge.csv");
        const text = await res.text();
        const parsed = Papa.parse(text, {
          header: false,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        const coords = (parsed.data as google.maps.LatLngLiteral[][])
          .map((row) => {
            const [lat, lng] = row;
            return { lat: Number(lat), lng: Number(lng) };
          })
          .filter((p) => !Number.isNaN(p.lat) && !Number.isNaN(p.lng));

        if (coords.length === 0) return;

        polygon = new window.google.maps.Polygon({
          paths: coords,
          strokeColor: "#000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#000",
          fillOpacity: 0.05,
        });

        polygon.setMap(map);
      } catch (err) {
        console.error("Failed to load or parse ge.csv", err);
      }
    })();

    return () => {
      if (polygon) polygon.setMap(null);
    };
  }, [map, displayActivities]);

  return (
    <div ref={containerRef} className="relative w-full rounded-2xl">
      <GoogleMap
        mapId="58f416a6016f63d8ac38d7c5"
        defaultCenter={
          selectedActivity
            ? selectedActivity[0].location
            : { lat: 41.73809, lng: 44.7808 } // Tbilisi coordinates
        }
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        defaultZoom={selectedActivity ? 16 : 12}
        minZoom={6}
        streetViewControl={true}
        streetViewControlOptions={{
          position: ControlPosition.INLINE_END_BLOCK_CENTER,
        }}
        className={`${mapHeight} w-full`}
        onMousemove={(e) => {
          mouseMoveHandler(e);
        }}
        onClick={(e) => {
          onClickHandler(e);
        }}
        restriction={{
          latLngBounds: GEORGIA_BOUNDS,
          strictBounds: false,
        }}
      >
        {displayActivities ? (
          <PoiMarkers pois={activityLocations} />
        ) : (
          <PoiMarkers pois={selectedActivity!} enableClick={false} />
        )}

        {/* Show marker when latLng is set (from address selection or map click) */}
        {latLng && !displayActivities && (
          <AdvancedMarker position={latLng}>
            <FloatingCursorPin />
          </AdvancedMarker>
        )}

        {/* Show floating cursor pin when enabled and clicked */}
        {clickedLatLng && isFloatingEnabled && (
          <AdvancedMarker position={clickedLatLng}>
            <FloatingCursorPin />
          </AdvancedMarker>
        )}

        {cursorPos && isFloatingEnabled && (
          <div
            style={{
              position: "absolute",
              left: cursorPos.x,
              top: cursorPos.y,
              pointerEvents: "none",
              zIndex: 9999,
              transform: "translate(-50%, -100%)",
            }}
          >
            <FloatingCursorPin />
          </div>
        )}

        <MapControl position={ControlPosition.RIGHT_CENTER}>
          <div className="m-2 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>
            <button
              onClick={handleZoomOut}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>
            <button
              onClick={handleFullscreen}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              ) : (
                <Maximize className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
            <button
              onClick={handleResetToTbilisi}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Reset to Tbilisi"
              aria-label="Reset to Tbilisi"
            >
              <Home className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            className="m-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            title="Locate Me"
            aria-label="Locate Me"
          >
            <MapPin
              className={`h-5 w-5 text-gray-700 dark:text-gray-200 ${
                isLocating ? "animate-pulse" : ""
              }`}
            />
          </button>
        </MapControl>
      </GoogleMap>
    </div>
  );
};

const MapWrapper: React.FC<{
  API_KEY: string;
  height?: string;
  displayActivities?: boolean;
  selectedActivityLocation?: Poi[];
  skipAPIProvider?: boolean;
}> = ({
  API_KEY,
  height,
  displayActivities,
  selectedActivityLocation,
  skipAPIProvider = false,
}) => {
  const [mapError, setMapError] = useState<string | null>(null);

  const normalizedApiKey = useMemo(() => {
    if (!API_KEY) return "";
    return String(API_KEY).trim();
  }, [API_KEY]);

  const isValidKeyFormat = useMemo(() => {
    if (!normalizedApiKey) return false;
    return normalizedApiKey.startsWith("AIza") && normalizedApiKey.length >= 35;
  }, [normalizedApiKey]);

  useEffect(() => {
    // Listen for Google Maps errors
    const handleError = (event: ErrorEvent) => {
      if (
        event.message?.includes("InvalidKeyMapError") ||
        event.message?.includes("Google Maps JavaScript API error")
      ) {
        setMapError(
          "Invalid Google Maps API key. Please check your API key in .env.local and ensure it's valid and has the Maps JavaScript API enabled.",
        );
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (!normalizedApiKey) {
    console.error(
      "Google Maps API key is missing. Please set GOOGLE_MAPS_API_KEY in your .env.local file.",
    );
    return (
      <div className="flex h-full items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
        <div className="p-4 text-center">
          <p className="text-lg font-semibold text-red-600 dark:text-red-400">
            Google Maps API Key Missing
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please set GOOGLE_MAPS_API_KEY in your .env.local file.
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            Get your API key from{" "}
            <a
              href="https://console.cloud.google.com/google/maps-apis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Google Cloud Console
            </a>
          </p>
        </div>
      </div>
    );
  }

  if (!isValidKeyFormat) {
    console.warn(
      "Google Maps API key format appears invalid. Please verify your API key.",
    );
  }

  if (mapError) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
        <div className="p-4 text-center">
          <p className="text-lg font-semibold text-red-600 dark:text-red-400">
            Google Maps API Error
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {mapError}
          </p>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
            <a
              href="https://console.cloud.google.com/google/maps-apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Check your API key settings
            </a>
            {" | "}
            <a
              href="https://console.cloud.google.com/apis/library/maps-backend.googleapis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Enable Maps JavaScript API
            </a>
          </p>
        </div>
      </div>
    );
  }

  const mapContent = mapError ? (
    <div className="flex h-full items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
      <div className="p-4 text-center">
        <p className="text-lg font-semibold text-red-600 dark:text-red-400">
          Google Maps API Error
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {mapError}
        </p>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
          <a
            href="https://console.cloud.google.com/google/maps-apis/credentials"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Check your API key settings
          </a>
          {" | "}
          <a
            href="https://console.cloud.google.com/apis/library/maps-backend.googleapis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Enable Maps JavaScript API
          </a>
        </p>
      </div>
    </div>
  ) : (
    <MapComponent
      mapHeight={height}
      displayActivities={displayActivities}
      selectedActivity={selectedActivityLocation}
    />
  );

  // Skip APIProvider if already inside one
  if (skipAPIProvider) {
    return <Suspense fallback={<MapLoadingLayout />}>{mapContent}</Suspense>;
  }

  return (
    <Suspense fallback={<MapLoadingLayout />}>
      <APIProvider apiKey={normalizedApiKey} libraries={["places"]}>
        {mapContent}
      </APIProvider>
    </Suspense>
  );
};

export default MapWrapper;
