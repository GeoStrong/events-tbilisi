import { Skeleton } from "@mui/material";
import React from "react";
const CreateActivityLoading: React.FC = () => {
  return (
    <div className="w-full space-y-4 p-3">
      <Skeleton variant="text" width={100} />
      <Skeleton variant="rectangular" className="w-full" />
      <Skeleton variant="text" width={100} />
      <Skeleton variant="rectangular" className="w-full" />
      <Skeleton variant="text" width={100} />
      <Skeleton variant="rectangular" className="w-full" />
      <Skeleton variant="text" width={100} />
      <Skeleton variant="rectangular" className="w-full" />
      <Skeleton variant="text" width={100} />
      <Skeleton variant="rectangular" className="w-full" />
    </div>
  );
};
export default CreateActivityLoading;
