"use client";

import React, { Suspense, useEffect, useRef } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
  useMap,
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

interface MapProps {
  displayActivities?: boolean;
  mapHeight?: string;
  selectedActivity?: Poi[];
}

const MapComponent: React.FC<MapProps> = ({
  displayActivities = true,
  mapHeight = "h-screen md:min-h-[500px]",
  selectedActivity,
}) => {
  const map = useMap();
  const dispatch = useDispatch();
  const { isFloatingEnabled } = useSelector((state: RootState) => state.map);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, _, removeValue] = useLocalStorage<Poi | null>("location", null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { cursorPos, clickedLatLng, mouseMoveHandler, onClickHandler } =
    useMapPinFloat(containerRef);

  const { activityLocations } = useActivitiesFilter();

  useEffect(() => {
    if (!map) return;
    dispatch(mapActions.setMap(map));
  }, [dispatch, map]);

  useEffect(() => {
    if (value && map) {
      zoomToLocation(map, value);
    }
    setTimeout(() => {
      removeValue();
    }, 500);
  }, [map, removeValue, value]);

  return (
    <div ref={containerRef} className="relative w-full rounded-2xl">
      <GoogleMap
        mapId="bd8257f6f4dd710a"
        defaultCenter={
          selectedActivity
            ? selectedActivity[0].location
            : { lat: 41.73809, lng: 44.7808 }
        }
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        defaultZoom={selectedActivity ? 16 : 8}
        minZoom={12}
        className={`${mapHeight} w-full`}
        onMousemove={(e) => {
          mouseMoveHandler(e);
        }}
        onClick={(e) => {
          onClickHandler(e);
        }}
      >
        {displayActivities ? (
          <PoiMarkers pois={activityLocations} />
        ) : (
          <PoiMarkers pois={selectedActivity!} enableClick={false} />
        )}

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
      </GoogleMap>
    </div>
  );
};

const MapWrapper: React.FC<{
  API_KEY: string;
  height?: string;
  displayActivities?: boolean;
  selectedActivityLocation?: Poi[];
}> = ({ API_KEY, height, displayActivities, selectedActivityLocation }) => {
  return (
    <Suspense fallback={<MapLoadingLayout />}>
      <APIProvider apiKey={API_KEY}>
        <MapComponent
          mapHeight={height}
          displayActivities={displayActivities}
          selectedActivity={selectedActivityLocation}
        />
      </APIProvider>
    </Suspense>
  );
};

export default MapWrapper;
