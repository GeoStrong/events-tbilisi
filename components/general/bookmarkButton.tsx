"use client";

import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import { handleSavedEvents, isEventSaved } from "@/lib/profile/profile";
import React, { useEffect, useState } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import Spinner from "./spinner";
import { useDispatch } from "react-redux";
import { authActions } from "@/lib/store/authSlice";
import { toast } from "sonner";

const BookmarkButton: React.FC<{ eventId: string }> = ({ eventId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useGetUserProfile();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSaved = async () => {
      if (!user) {
        setIsSaved(false);
        setLoading(false);
        return;
      }

      try {
        const saved = await isEventSaved(user.id, eventId);
        setIsSaved(saved);
      } catch (error) {
        console.error("Error fetching saved:", error);
      }

      setLoading(false);
    };

    fetchSaved();
  }, [user, eventId]);

  const toggleSave = async () => {
    if (!user) {
      return dispatch(authActions.setAuthDialogOpen(true));
    }

    const newState = !isSaved;
    setIsSaved(newState);

    try {
      if (newState) {
        toast.success(`The activity has been saved`);
      } else {
        toast.error("The activity has been unsaved");
      }
      await handleSavedEvents(user, eventId, newState);
    } catch {
      setIsSaved(!newState);
    }
  };

  return (
    <>
      <button disabled={loading} onClick={toggleSave}>
        {loading ? (
          <Spinner />
        ) : (
          <BsFillBookmarkFill
            className={`text-lg md:text-2xl ${isSaved ? "text-primary" : ""}`}
          />
        )}
      </button>
    </>
  );
};
export default BookmarkButton;
