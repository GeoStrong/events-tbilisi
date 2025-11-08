import { supabase } from "../supabase/supabaseClient";

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

export const getCategoriesByEventId = async (eventId: number | string) => {
  const { data: categoryId, error: categoryIdError } = await supabase
    .from("event_categories")
    .select("category_id")
    .eq("event_id", eventId);

  if (categoryIdError) {
    console.error("Error fetching categories for event:", categoryIdError);
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

export const getEvents = async () => {
  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data;
};

export const getEventById = async (eventId: number | string) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId);

  if (error) {
    console.error("Error fetching event by ID:", error);
    return null;
  }

  return data;
};

export const getEventsByCategoryId = async (categoryId: string) => {
  const { data: eventIds, error: eventIdsError } = await supabase
    .from("event_categories")
    .select("event_id")
    .eq("category_id", categoryId);

  if (eventIdsError) {
    console.error("Error fetching event categories:", eventIdsError);
    return [];
  }

  const events = (
    await Promise.all(
      eventIds!.map((item) =>
        getEventById(item.event_id).then((event) => event),
      ),
    )
  ).flat();

  return events;
};

export const getEventImageUrl = async (imageLocation: string) => {
  const { data: imageData } = supabase.storage
    .from("Events-Tbilisi media")
    .getPublicUrl(imageLocation);
  const eventImage = imageData?.publicUrl;

  return eventImage;
};
