import { Skeleton } from "@mui/material";
import React from "react";

const ProfileLayoutLoading: React.FC = () => {
  return (
    <div className="mt-12 w-full px-5">
      <Skeleton variant="text" width={150} height={30} />
      <div className="my-5">
        <Skeleton variant="rounded" width="w-full" height={200} />
      </div>
      <Skeleton variant="rounded" width="w-full" height={30} className="mb-4" />
      <Skeleton variant="rounded" width="w-full" height={500} />
    </div>
  );
};
export default ProfileLayoutLoading;
