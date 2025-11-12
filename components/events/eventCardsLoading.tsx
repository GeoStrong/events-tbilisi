import { Skeleton } from "@mui/material";
import React from "react";
const EventCardsLoading: React.FC = () => {
  return (
    <div className="mt-10 w-full">
      <Skeleton
        className="dark:!bg-gray-600"
        variant="text"
        width={200}
      ></Skeleton>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Skeleton
          variant="rounded"
          className="w-full dark:!bg-gray-600"
          height={250}
        />
        <Skeleton
          variant="rounded"
          className="w-full dark:!bg-gray-600"
          height={250}
        />
        <Skeleton
          variant="rounded"
          className="w-full dark:!bg-gray-600"
          height={250}
        />
        <Skeleton
          variant="rounded"
          className="w-full dark:!bg-gray-600"
          height={250}
        />
      </div>
    </div>
  );
};
export default EventCardsLoading;
