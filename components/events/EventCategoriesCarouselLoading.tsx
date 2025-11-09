import { Skeleton } from "@mui/material";
import React from "react";
const EventCategoriesCarouselLoading: React.FC = () => {
  return (
    <div className="w-full">
      <Skeleton variant="text" width={250} />
      <div className="mt-5 flex gap-3 md:gap-8">
        <Skeleton width={50} height={50} variant="circular" />
        <Skeleton width={50} height={50} variant="circular" />
        <Skeleton width={50} height={50} variant="circular" />
        <Skeleton width={50} height={50} variant="circular" />
      </div>
    </div>
  );
};
export default EventCategoriesCarouselLoading;
