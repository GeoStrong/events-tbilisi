import { Poi } from "../types";

export const makeFirstLetterUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const makeFirstLetterLowerCase = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const zoomToLocation = (map: google.maps.Map | null, location: Poi) => {
  map?.setZoom(10);
  map?.setCenter(location.location);
  setTimeout(() => {
    map?.setZoom(16);
  }, 500);
};
