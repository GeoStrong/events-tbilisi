import React from "react";
import CreateActivityLayout from "@/components/create-activity/createActivityLayout";
import { env } from "@/lib/utils/env";

const Map: React.FC = () => {
  // Use NEXT_PUBLIC_ prefix so it's available on client side

  const key = env.googleMapsApiKey || "";

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
