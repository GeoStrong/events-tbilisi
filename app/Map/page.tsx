import React from "react";
import MapWrapper from "@/components/map/map";
import DisplayEventsBtnWrapper from "@/components/map/displayEventsBtn";

const Map: React.FC = () => {
  const key = process.env.API_KEY || "";

  return (
    <>
      <div className="flex w-full flex-col gap-2 rounded-md bg-white dark:bg-gray-800 lg:flex-row">
        <div className="absolute -top-24 left-0 w-full rounded-2xl md:static">
          <MapWrapper API_KEY={key} />
        </div>
        <div className="fixed bottom-14 left-0 flex w-full justify-center">
          <DisplayEventsBtnWrapper />
        </div>
      </div>
    </>
  );
};
export default Map;
