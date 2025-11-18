import { useLocalStorage } from "react-use";
import { Poi } from "../types";
import { zoomToLocation } from "../functions/helperFunctions";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import useAddSearchQuery from "./useAddSearchQuery";

const useMapZoom = (eventId: string) => {
  const { map } = useSelector((state: RootState) => state.map);
  const { handleSearch } = useAddSearchQuery();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setValue, removeValue] = useLocalStorage<Poi | null>(
    "location",
    null,
  );

  const setLocationToLocalStorage = (location: Poi) => {
    setValue(location);
  };

  const handleLocationClick = (location: google.maps.LatLngLiteral) => {
    const poi: Poi = {
      key: `activity-${eventId}`,
      location: location,
    };
    setLocationToLocalStorage(poi);
    zoomToLocation(map, poi);
    setTimeout(() => {
      removeValue();
    }, 500);
    return handleSearch("display-activities", "");
  };

  return {
    setLocationToLocalStorage,
    handleLocationClick,
  };
};

export default useMapZoom;
