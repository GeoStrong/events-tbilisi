import { Skeleton } from "@mui/material";
import React from "react";
const MapLoadingLayout: React.FC = () => {
  return (
    <>
      <Skeleton
        className="w-full"
        height={700}
        variant="rectangular"
      ></Skeleton>
    </>
  );
};
export default MapLoadingLayout;
