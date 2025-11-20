import { supabase } from "../supabase/supabaseClient";
import { EventEntity, ImageType, NewEventEntity } from "../types";
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
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("updated_at", { ascending: false });

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

export const getEventsByUserId = async (userId: string) => {
  const { data, error: eventIdsError } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", userId);

  if (eventIdsError) {
    console.error("Error fetching event categories:", eventIdsError);
    return [];
  }

  return data;
};

export const getEventImageUrl = async (imageLocation: ImageType) => {
  const image = isString(imageLocation) ? imageLocation : "";

  const { data: imageData } = supabase.storage
    .from("Events-Tbilisi media")
    .getPublicUrl(image);

  const eventImage = isValidImage(imageData.publicUrl);

  return eventImage;
};

export const postNewEvent = async (activity: NewEventEntity) => {
  const { data, error } = await supabase
    .from("events")
    .insert([activity])
    .select("*");

  if (error) throw error;

  return data as EventEntity[];
};

export const postEventCategory = async (eventId: string, category: string) => {
  const { data, error } = await supabase
    .from("event_categories")
    .insert([
      {
        event_id: eventId,
        category_id: category,
      },
    ])
    .select("*");

  if (error) return error;

  return data;
};

export const postNewEventCategories = async (
  eventId: string,
  categories: string[],
) => {
  const data = (
    await Promise.all(
      categories!.map((category) =>
        postEventCategory(eventId, category).then((category) => category),
      ),
    )
  ).flat();

  return data;
};

export const deleteEventByUser = async (userId: string, eventId: string) => {
  const { data, error } = await supabase
    .from("events")
    .delete()
    .eq("id", eventId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting an event:", error);
    return [];
  }

  return data;
};

export const updateEvent = async (
  eventId: string,
  updates: Partial<EventEntity>,
) => {
  const { data, error } = await supabase
    .from("events")
    .update(updates)
    .eq("id", eventId)
    .eq("user_id", updates.user_id)
    .select("*")
    .single();

  if (error) throw error;

  return data;
};
