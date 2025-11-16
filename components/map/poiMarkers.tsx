import { IoIosPin } from "react-icons/io";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import { Poi } from "@/lib/types";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import React from "react";

const PoiMarkers: React.FC<{ pois: Poi[] }> = ({ pois }) => {
  const { handleReplace } = useAddSearchQuery();
  return (
    <>
      {pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          onClick={(event) => {
            let element = event.domEvent.target as HTMLElement;
            while (element && !element.id) {
              element = element.parentElement as HTMLElement;
            }
            if (element && element.id) {
              const newParams = new URLSearchParams();
              const eventId = element.id.split("-").slice(1).join("-");
              newParams.set("activity", eventId);
              handleReplace(newParams);
            }
          }}
          position={poi.location}
          clickable
        >
          <IoIosPin id={poi.key} className="text-4xl text-red-500" />
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
