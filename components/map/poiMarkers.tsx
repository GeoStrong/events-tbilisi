import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import { Poi } from "@/lib/types";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import React from "react";

const PoiMarkers: React.FC<{ pois: Poi[] }> = ({ pois }) => {
  const { handleReplace, searchParams } = useAddSearchQuery();
  const params = new URLSearchParams(searchParams);

  return (
    <>
      {pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          onClick={(event) => {
            const pin = event.domEvent.target as HTMLDivElement;
            params.set("display-events", "true");
            params.set("event", pin.id.split("-")[1]);
            handleReplace(params);
          }}
          position={poi.location}
          clickable
        >
          <div id={poi.key} className="h-8 w-8 rounded-full bg-red-500"></div>
          {/* <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          /> */}
        </AdvancedMarker>
      ))}
    </>
  );
};
export default PoiMarkers;
