import React from "react";
import CreateActivityLayout from "@/components/create-activity/createActivityLayout";

const Map: React.FC = () => {
  const key = process.env.API_KEY || "";

  return (
    <>
      <h1 className="mt-5 text-center text-3xl font-bold">
        Create a New Public Activity
      </h1>
      <CreateActivityLayout mapKey={key} />
    </>
  );
};
export default Map;
