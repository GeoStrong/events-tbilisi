import { Poi } from "../types";

export const zoomToLocation = (map: google.maps.Map | null, location: Poi) => {
  map?.setZoom(10);
  map?.setCenter(location.location);
  setTimeout(() => {
    map?.setZoom(16);
  }, 500);
};
