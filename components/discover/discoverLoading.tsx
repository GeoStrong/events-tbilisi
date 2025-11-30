// import { Skeleton } from "@mui/material";
import React from "react";
import { Skeleton } from "../ui/skeleton";
const DiscoverLoading: React.FC = () => {
  return (
    <div className="p-4 md:p-8">
      <Skeleton className="h-10 w-full md:w-96" />
      <div className="mt-6 flex flex-col items-center justify-center gap-8 md:flex-row md:items-start">
        <Skeleton className="h-12 w-28 md:hidden" />
        <Skeleton className="hidden w-64 p-4 md:block">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="mt-5 h-4 w-24" />
          <Skeleton className="mt-2 h-4 w-20" />
          <Skeleton className="mt-2 h-4 w-24" />
          <Skeleton className="mt-2 h-4 w-20" />
          <Skeleton className="mt-2 h-4 w-16" />
          <Skeleton className="mt-2 h-4 w-20" />
          <Skeleton className="mt-2 h-4 w-24" />
        </Skeleton>
        <div className="w-full">
          <Skeleton className="h-full w-full space-y-2 p-6 md:space-y-5">
            <div className="flex flex-col gap-2 md:flex-row">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-10 w-full md:h-12 md:w-28" />
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-14" />
              <Skeleton className="h-10 w-full md:hidden" />
            </div>
          </Skeleton>
          <div className="mt-5 flex w-full flex-col gap-6 md:flex-row">
            <Skeleton className="h-72 w-full rounded-xl" />
            <Skeleton className="h-72 w-full rounded-xl" />
            <Skeleton className="h-72 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DiscoverLoading;
