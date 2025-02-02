import React from "react";
import CreateEventBtn from "@/components/map/createEventBtn";
import Welcome from "@/components/map/welcome";
import MapWrapper from "@/components/map/map";

const Map: React.FC = () => {
  const key = process.env.API_KEY || "";

  return (
    <>
      <div className="flex w-full flex-col gap-2 rounded-md bg-white dark:bg-gray-800 lg:flex-row">
        <div className="absolute -top-24 left-0 w-full rounded-2xl md:static">
          <MapWrapper API_KEY={key} />
        </div>
        <Welcome />
        <div className="fixed bottom-14 left-0 flex w-full justify-center md:hidden">
          <CreateEventBtn />
        </div>
      </div>
    </>
  );
};
export default Map;
