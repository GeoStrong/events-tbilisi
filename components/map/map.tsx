"use client";

import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  MapMouseEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import PoiMarkers from "./poiMarkers";
import { Poi } from "@/lib/types";
import { locations } from "@/lib/fakeData/locations";
import { useDispatch } from "react-redux";
import { mapActions } from "@/lib/store/mapSlice";
import { useLocalStorage } from "react-use";
import { zoomToLocation } from "@/lib/functions/helperFunctions";

const MapComponent: React.FC = () => {
  const map = useMap();
  const [eventsLocations, setEventsLocations] = useState<Poi[]>(locations);
  const dispatch = useDispatch();
  const [value] = useLocalStorage<Poi | null>("location", null);

  const addNewEventLocation = (event: MapMouseEvent) => {
    console.log(event);
    // const latLng = event.detail.latLng;
    // if (!latLng) return;

    // const newLocation = {
    //   key: `event-${eventsLocations.length + 1}`,
    //   location: latLng,
    // };
    // setEventsLocations([...eventsLocations, newLocation]);
  };

  useEffect(() => {
    if (!map) return;
    dispatch(mapActions.setMap(map));
  }, [dispatch, map]);

  useEffect(() => {
    if (value && map) {
      zoomToLocation(map, value);
    }
  }, [map, value]);

  return (
    <GoogleMap
      mapId="bd8257f6f4dd710a"
      defaultCenter={{ lat: 41.73809, lng: 44.7808 }}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      defaultZoom={8}
      minZoom={12}
      className="h-screen w-full md:min-h-[500px]"
      onClick={addNewEventLocation}
    >
      <PoiMarkers pois={eventsLocations} />
    </GoogleMap>
  );
};

const MapWrapper: React.FC<{ API_KEY: string }> = ({ API_KEY }) => {
  return (
    <APIProvider apiKey={API_KEY}>
      <MapComponent />
    </APIProvider>
  );
};

export default MapWrapper;
