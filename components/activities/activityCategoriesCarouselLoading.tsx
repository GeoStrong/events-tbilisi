import { Skeleton } from "@mui/material";
import React from "react";

const ActivityCategoriesCarouselLoading: React.FC = () => {
  return (
    <div className="w-full">
      <Skeleton className="dark:!bg-slate-700" variant="text" width={250} />
      <div className="mt-5 flex gap-3 md:gap-8">
        <Skeleton
          width={50}
          height={50}
          className="dark:!bg-slate-700"
          variant="rectangular"
        />
        <Skeleton
          width={50}
          height={50}
          className="dark:!bg-slate-700"
          variant="rectangular"
        />
        <Skeleton
          width={50}
          height={50}
          className="dark:!bg-slate-700"
          variant="rectangular"
        />
        <Skeleton
          width={50}
          height={50}
          className="dark:!bg-slate-700"
          variant="rectangular"
        />
      </div>
    </div>
  );
};
export default ActivityCategoriesCarouselLoading;
