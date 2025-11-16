import React from "react";
import MapWrapper from "@/components/map/map";
import CreateActivityLayout from "@/components/create-activity/createActivityLayout";

const Map: React.FC = () => {
  const key = process.env.API_KEY || "";

  return (
    <>
      <h1 className="mt-5 text-center text-3xl font-bold">
        Create a New Public Activity
      </h1>
      <div className="mt-3 flex w-full flex-col gap-2 rounded-md bg-white dark:bg-gray-800 lg:flex-row">
        <div className="absolute -top-12 left-0 w-full rounded-2xl md:static">
          <MapWrapper API_KEY={key} />
        </div>
        <CreateActivityLayout />
      </div>
    </>
  );
};
export default Map;
