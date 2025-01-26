import Map from "@/components/map/map";
import React from "react";

const MapWrapper: React.FC = () => {
  const key = process.env.API_KEY || "";

  return (
    <>
      <div className="flex h-screen w-full bg-white">
        <Map API_KEY={key} />
      </div>
    </>
  );
};
export default MapWrapper;
