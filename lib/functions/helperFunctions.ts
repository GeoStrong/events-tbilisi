import { supabase } from "../supabase/supabaseClient";
import { Poi, UserProfile } from "../types";

export const isString = (value: unknown) => {
  return typeof value === "string";
};

export const isFile = (value: unknown) => {
  return value instanceof File;
};

export const isValidImage = (url?: string) => {
  if (!url) return null;

  if (url.endsWith("/")) return null;

  const validExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
  if (validExtensions.some((ext) => url.toLowerCase().includes(ext)))
    return url;
};

export const zoomToLocation = (map: google.maps.Map | null, location: Poi) => {
  map?.setZoom(10);
  map?.setCenter(location.location);
  setTimeout(() => {
    map?.setZoom(16);
  }, 500);
};

export const handleUploadFile = async (
  folderDestination: string,
  file: File,
  user: UserProfile,
) => {
  if (!user) throw new Error("User ID is required");
  if (!file) throw new Error("No file selected");

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${folderDestination}/${user.id}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("Events-Tbilisi media")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  return filePath;
};
