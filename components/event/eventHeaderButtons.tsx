"use client";

import React from "react";
import EventParticipation from "../events/eventParticipation";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import { Button } from "../ui/button";
import { deleteEventByUser } from "@/lib/functions/supabaseFunctions";
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
import EventUpdate from "./eventUpdate";
import { Category, EventEntity } from "@/lib/types";

const EventHeaderButtons: React.FC<{
  event: EventEntity;
  categories: Category[];
}> = ({ event, categories }) => {
  const { user } = useGetUserProfile();

  const isUserHost = event.user_id === user?.id;

  const deleteEventHandler = async () => {
    if (!user?.id) return;
    await deleteEventByUser(user.id);
    redirect("/");
  };

  const categoryIds = categories.map((category) => category.id);

  const updatedEvent = {
    ...event,
    categories: categoryIds,
  };

  return (
    <>
      <div className="fixed bottom-16 left-0 flex w-full justify-center md:static md:bottom-0 md:justify-end">
        {isUserHost ? (
          <div className="flex flex-col items-center gap-2">
            <EventUpdate user={user!} event={updatedEvent} />
            <Dialog>
              <DialogTrigger className="rounded-md bg-red-600 px-6 py-1 text-white shadow-lg">
                Delete
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Are you absolutely sure you want to delete?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row justify-end gap-3">
                  <DialogClose>Close</DialogClose>
                  <Button variant="destructive" onClick={deleteEventHandler}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <EventParticipation isBtnLarge />
        )}
      </div>
    </>
  );
};
export default EventHeaderButtons;
