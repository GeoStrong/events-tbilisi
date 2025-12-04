import { supabase } from "../supabase/supabaseClient";
import {
  ActivityCategories,
  ActivityEntity,
  ImageType,
  NewActivityEntity,
} from "../types";
import { isString, isValidImage } from "./helperFunctions";

export const getCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
};

export const getCategoryById = async (categoryId: number | string) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId);

  if (error) {
    console.error("Error fetching category by ID:", error);
    return null;
  }

  return data;
};

export const getCategoriesByActivityId = async (
  activityId: number | string,
) => {
  const { data: categoryId, error: categoryIdError } = await supabase
    .from("activity_categories")
    .select("category_id")
    .eq("activity_id", activityId);

  if (categoryIdError) {
    console.error("Error fetching categories for activity:", categoryIdError);
    return [];
  }

  const categories = (
    await Promise.all(
      categoryId?.map((item) =>
        getCategoryById(item.category_id).then((category) => category),
      ),
    )
  ).flat();

  return categories;
};

export const getActivities = async () => {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching activities:", error);
    return [];
  }

  return data;
};

export const getActivityById = async (activityId: number | string) => {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("id", activityId);

  if (error) {
    console.error("Error fetching activity by ID:", error);
    return null;
  }

  return data;
};

export const getActivitiesByCategoryId = async (categoryId: string) => {
  const { data: activityIds, error: activityIdsError } = await supabase
    .from("activity_categories")
    .select("activity_id")
    .eq("category_id", categoryId);

  if (activityIdsError) {
    console.error("Error fetching activity categories:", activityIdsError);
    return [];
  }

  const activities = (
    await Promise.all(
      activityIds!.map((item) =>
        getActivityById(item.activity_id).then((activity) => activity),
      ),
    )
  ).flat();

  return activities;
};

export const getActivitiesByUserId = async (userId: string) => {
  const { data, error: activityIdsError } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", userId);
  if (activityIdsError) {
    console.error("Error fetching activity categories:", activityIdsError);
    return [];
  }

  return data as ActivityEntity[];
};

export const getImageUrl = async (imageLocation: ImageType) => {
  const image = isString(imageLocation) ? imageLocation : "";

  const { data: imageData } = await supabase.storage
    .from("Events-Tbilisi media")
    .createSignedUrl(image, 60 * 60);

  const activityImage = isValidImage(imageData?.signedUrl);

  return activityImage;
};

export const deleteImageFromStorage = async (imagePath: string | null) => {
  if (!imagePath) return;
  return await supabase.storage
    .from("Events-Tbilisi media")
    .remove([imagePath]);
};

export const postNewActivity = async (activity: NewActivityEntity) => {
  const { data, error } = await supabase
    .from("activities")
    .insert([activity])
    .select("*");

  if (error) throw error;

  return data as ActivityEntity[];
};

export const postActivityCategory = async (
  activityId: string,
  category: string,
) => {
  const { data, error } = await supabase
    .from("activity_categories")
    .insert([
      {
        activity_id: activityId,
        category_id: category,
      },
    ])
    .select("*");

  if (error) return error;

  return data;
};

export const postNewActivityCategories = async (
  activityId: string,
  categories: ActivityCategories[] | string[],
) => {
  const data = (
    await Promise.all(
      categories!.map((category) =>
        postActivityCategory(activityId, category).then((category) => category),
      ),
    )
  ).flat();

  return data;
};

export const deleteActivityByUser = async (
  userId: string,
  activityId: string,
) => {
  const { data, error } = await supabase
    .from("activities")
    .delete()
    .eq("id", activityId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting an activity:", error);
    return [];
  }

  return data;
};

export const updateActivtiy = async (
  activityId: string,
  updates: Partial<ActivityEntity>,
) => {
  const { data, error } = await supabase
    .from("activities")
    .update(updates)
    .eq("id", activityId)
    .eq("user_id", updates.user_id)
    .select("*")
    .single();

  if (error) throw error;

  return data;
};

export const deleteActivityCategories = async (activityId: string) => {
  const { error } = await supabase
    .from("activity_categories")
    .delete()
    .eq("activity_id", activityId);

  if (error) throw error;
};
