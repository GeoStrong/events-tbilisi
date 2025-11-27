"use client";

import React from "react";
import ActivityParticipation from "../activities/activityParticipation";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import { Button } from "../ui/button";
import { deleteActivityByUser } from "@/lib/functions/supabaseFunctions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { redirect } from "next/navigation";
import ActivityUpdate from "./activityUpdate";
import { Category, ActivityEntity } from "@/lib/types";

const ActivityHeaderButtons: React.FC<{
  activity: ActivityEntity;
  categories: Category[];
}> = ({ activity, categories }) => {
  const { user } = useGetUserProfile();

  const isUserHost = activity.user_id === user?.id;

  const deleteActivityHandler = async () => {
    if (!user?.id) return;
    await deleteActivityByUser(user.id, activity.id);
    redirect("/");
  };

  const categoryIds = categories.map((category) => category.id);

  const updatedActivity = {
    ...activity,
    categories: categoryIds,
  };

  return (
    <>
      <div className="fixed bottom-16 left-0 flex w-full justify-center md:static md:bottom-0 md:justify-end">
        {user?.id !== undefined && isUserHost && (
          <div className="flex w-full flex-row justify-between gap-2 px-6 md:justify-end">
            <ActivityUpdate user={user!} activity={updatedActivity} />
            <Dialog>
              <DialogTrigger className="h-10 w-1/2 rounded-md bg-red-600 px-8 py-1 text-white shadow-lg md:w-auto">
                Delete
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="w-2/3 text-center">
                  <DialogTitle>
                    Are you absolutely sure you want to delete?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your activity and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row justify-end gap-3">
                  <DialogClose>Close</DialogClose>
                  <Button variant="destructive" onClick={deleteActivityHandler}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
        {user?.id !== undefined && !isUserHost && (
          <ActivityParticipation isBtnLarge />
        )}
      </div>
    </>
  );
};
export default ActivityHeaderButtons;
