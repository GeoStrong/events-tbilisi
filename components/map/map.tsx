"use client";

import React from "react";
import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";

const Map: React.FC<{ API_KEY: string }> = ({ API_KEY }) => {
  return (
    <div className="w-full rounded-2xl md:w-2/3">
      <APIProvider apiKey={API_KEY}>
        <GoogleMap
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </APIProvider>
    </div>
  );
};
export default Map;
