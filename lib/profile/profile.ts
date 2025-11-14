import { supabase } from "../supabase/supabaseClient";
import { UserProfile } from "../types";

export const handleUploadUserAvatar = async (user: UserProfile, file: File) => {
  if (!user) throw new Error("User ID is required");
  if (!file) throw new Error("No file selected");

  const fileExt = file.name.split(".").pop();
  const fileName = `avatar.${fileExt}`;
  const filePath = `avatars/${user.id}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("Events-Tbilisi media")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

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
