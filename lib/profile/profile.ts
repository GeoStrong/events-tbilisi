import { handleUploadFile } from "../functions/helperFunctions";
import { getEventById } from "../functions/supabaseFunctions";
import { supabase } from "../supabase/supabaseClient";
import { EventEntity, SavedEventEntity, UserProfile } from "../types";

export const handleUploadUserAvatar = async (user: UserProfile, file: File) => {
  const filePath = await handleUploadFile("avatars", file, user);
  const { data } = supabase.storage
    .from("Events-Tbilisi media")
    .getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from("users")
    .update({ avatar_path: data.publicUrl })
    .eq("id", user.id);

  if (updateError) throw updateError;

  return data.publicUrl;
};

export const handleUploadUserInformation = async (
  user: UserProfile,
  name?: string,
  phone?: string,
  bio?: string,
) => {
  const { data, error } = await supabase
    .from("users")
    .update([
      {
        ...user,
        name,
        phone,
        additionalInfo: bio,
      },
    ])
    .eq("id", user.id);

  if (error) throw error;

  return data;
};

export const handleSavedEvents = async (
  user: UserProfile,
  eventId: string,
  save: boolean,
) => {
  if (save) {
    const { error } = await supabase.from("saved_events").insert([
      {
        user_id: user.id,
        event_id: eventId,
      },
    ]);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("saved_events")
      .delete()
      .eq("user_id", user.id)
      .eq("event_id", eventId);

    if (error) throw error;
  }
};

export const fetchSavedEvents = async (userId: string) => {
  const { data: savedEventsId, error: savedEventsError } = await supabase
    .from("saved_events")
    .select("*")
    .eq("user_id", userId);

  if (savedEventsError) throw savedEventsError;

  const savedEvents = (
    await Promise.all(
      savedEventsId.map(
        async (event: SavedEventEntity) => await getEventById(event.event_id),
      ),
    )
  ).flat() as EventEntity[];

  return savedEvents;
  // const savedEvents  = await getEventById()
};

export const isEventSaved = async (userId: string, eventId: string) => {
  const { data, error } = await supabase
    .from("saved_events")
    .select("event_id")
    .eq("user_id", userId)
    .eq("event_id", eventId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return !!data;
};
