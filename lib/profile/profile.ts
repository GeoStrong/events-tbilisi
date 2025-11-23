import { handleUploadFile } from "../functions/helperFunctions";
import { getActivityById } from "../functions/supabaseFunctions";
import { supabase } from "../supabase/supabaseClient";
import { ActivityEntity, SavedActivityEntity, UserProfile } from "../types";

export const handleUploadUserAvatar = async (user: UserProfile, file: File) => {
  const filePath = await handleUploadFile("avatars", file, user);
  const { data } = supabase.storage
    .from("Events-Tbilisi media")
    .getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from("users")
    .update({ avatar_path: filePath })
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

export const handleSavedActivities = async (
  user: UserProfile,
  activityId: string,
  save: boolean,
) => {
  if (save) {
    const { error } = await supabase.from("saved_activities").insert([
      {
        user_id: user.id,
        activity_id: activityId,
      },
    ]);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("saved_activities")
      .delete()
      .eq("user_id", user.id)
      .eq("activity_id", activityId);

    if (error) throw error;
  }
};

export const fetchSavedActivities = async (userId: string) => {
  const { data: savedActivitiesId, error: savedActivitiesError } =
    await supabase.from("saved_activities").select("*").eq("user_id", userId);

  if (savedActivitiesError) throw savedActivitiesError;

  const savedActivities = (
    await Promise.all(
      savedActivitiesId.map(
        async (activity: SavedActivityEntity) =>
          await getActivityById(activity.activity_id),
      ),
    )
  ).flat() as ActivityEntity[];

  return savedActivities;
  // const savedActivities  = await getActivityById()
};

export const isActivitySaved = async (userId: string, activityId: string) => {
  const { data, error } = await supabase
    .from("saved_activities")
    .select("activity_id")
    .eq("user_id", userId)
    .eq("activity_id", activityId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return !!data;
};

export const fetchUserInfo = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("name, avatar_path")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
};
