import { Skeleton } from "@mui/material";
import React from "react";

const ActivityCardsLoading: React.FC = () => {
  return (
    <div className="mt-3 w-full">
      <div className="">
        <Skeleton className="dark:!bg-gray-600" variant="text" width={250} />
        <div className="mt-5 flex gap-3 md:gap-8">
          <Skeleton
            width={100}
            height={30}
            className="dark:!bg-gray-600"
            variant="rounded"
          />
          <Skeleton
            width={100}
            height={30}
            className="dark:!bg-gray-600"
            variant="rounded"
          />
          <Skeleton
            width={100}
            height={30}
            className="dark:!bg-gray-600"
            variant="rounded"
          />
          <Skeleton
            width={100}
            height={30}
            className="dark:!bg-gray-600"
            variant="rounded"
          />
        </div>
      </div>
      <div className="my-4">
        <Skeleton variant="rectangular" width="100%" height={400} />
      </div>
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
export default ActivityCardsLoading;
