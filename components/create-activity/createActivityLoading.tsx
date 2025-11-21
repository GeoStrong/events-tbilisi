import { Skeleton } from "@mui/material";
import React from "react";

const CreateActivityLoading: React.FC = () => {
  return (
    <div className="w-full space-y-4 p-3">
      <Skeleton variant="text" width={100} className="dark:!bg-gray-600" />
      <Skeleton variant="rectangular" className="w-full dark:!bg-gray-600" />
      <Skeleton variant="text" width={100} className="dark:!bg-gray-600" />
      <Skeleton variant="rectangular" className="w-full dark:!bg-gray-600" />
      <Skeleton variant="text" width={100} className="dark:!bg-gray-600" />
      <Skeleton variant="rectangular" className="w-full dark:!bg-gray-600" />
      <Skeleton variant="text" width={100} className="dark:!bg-gray-600" />
      <Skeleton variant="rectangular" className="w-full dark:!bg-gray-600" />
      <Skeleton variant="text" width={100} className="dark:!bg-gray-600" />
      <Skeleton variant="rectangular" className="w-full dark:!bg-gray-600" />
    </div>
  );
};
export default CreateActivityLoading;
