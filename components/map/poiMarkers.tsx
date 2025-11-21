import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import { Poi } from "@/lib/types";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import React from "react";
import HoverPin from "./hoverPin";

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
              const activityId = element.id.split("-").slice(1).join("-");
              newParams.set("activity", activityId);
              handleReplace(newParams);
            }
          }}
          position={poi.location}
          clickable
        >
          <HoverPin id={poi.key} />
        </AdvancedMarker>
      ))}
    </>
  );
};
export default PoiMarkers;
