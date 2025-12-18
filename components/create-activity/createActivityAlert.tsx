"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PostToFeedDialog from "@/components/feed/PostToFeedDialog";

interface CreateActivityAlertProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  isActivityCreated: boolean;
  activityId?: string;
  activityTitle?: string;
}

const CreateActivityAlert: React.FC<CreateActivityAlertProps> = ({
  buttonRef,
  isActivityCreated,
  activityId,
  activityTitle,
}) => {
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger ref={buttonRef} className="hidden">
          Open
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isActivityCreated
                ? "You created Activity!"
                : "You updated Activity"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isActivityCreated
                ? "You have successfully created an Activity 🎉. You can now post it to your feed with an optional comment, or leave the comment blank."
                : "You have successfully updated an Activity 🎉"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            {isActivityCreated && activityId && (
              <Button
                variant="outline"
                onClick={() => setPostDialogOpen(true)}
                className="w-full sm:w-auto"
              >
                Post to Feed
              </Button>
            )}
            <AlertDialogAction asChild>
              <Link href="/" className="w-full sm:w-auto">
                Go to Feed
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {activityId && (
        <PostToFeedDialog
          open={postDialogOpen}
          onOpenChange={setPostDialogOpen}
          activityId={activityId}
          activityTitle={activityTitle}
        />
      )}
    </>
  );
};
export default CreateActivityAlert;
