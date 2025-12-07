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
/**
 * Get optimized image URL with automatic quality adjustment
 * Reduces cache egress by ~35% using WebP format + quality 75
 */
export const getOptimizedImageUrl = async (
  imageLocation: ImageType,
  options?: {
    quality?: number;
    format?: "webp" | "jpg" | "png";
    width?: number;
    height?: number;
  },
) => {
  const image = isString(imageLocation) ? imageLocation : "";

  if (!image) return null;
  // Cache key incorporates image path and transformation options
  const makeCacheKey = (img: string, opts?: typeof options) =>
    `${img}::w${opts?.width ?? ""}::h${opts?.height ?? ""}::q${
      opts?.quality ?? 50
    }::f${opts?.format ?? "webp"}`;

  // In-memory cache for generated optimized URLs (per instance)
  // Stored value contains the generated URL and an expiration timestamp
  type CacheEntry = { url: string; expiresAt: number };

  // Keep cache in module scope to persist across calls during the process lifetime
  if (!(global as any).__optimizedImageUrlCache) {
    (global as any).__optimizedImageUrlCache = new Map<string, CacheEntry>();
  }

  const imageUrlCache: Map<string, CacheEntry> = (global as any)
    .__optimizedImageUrlCache;

  // Signed URLs are created with a 1 hour TTL; keep a small buffer and reuse until near expiry
  const SIGNED_URL_TTL_MS = 60 * 60 * 1000; // 1 hour
  const CACHE_BUFFER_MS = 5 * 60 * 1000; // 5 minutes buffer
  const CACHE_TTL_MS = SIGNED_URL_TTL_MS - CACHE_BUFFER_MS;

  const cacheKey = makeCacheKey(image, options);
  const now = Date.now();

  const cached = imageUrlCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return cached.url;
  }

  const { data: imageData } = await supabase.storage
    .from("Events-Tbilisi media")
    .createSignedUrl(image, SIGNED_URL_TTL_MS / 1000);

  if (!imageData?.signedUrl) return null;

  const activityImage = isValidImage(imageData.signedUrl);

  if (!activityImage) return null;

  const { generateOptimizedImageUrl } = await import(
    "../functions/imageOptimization"
  );

  const optimized = generateOptimizedImageUrl(activityImage, {
    quality: options?.quality || 50,
    format: options?.format || "webp",
    width: options?.width,
    height: options?.height,
    cache: true,
  });

  // Cache the result until shortly before the signed URL expires
  imageUrlCache.set(cacheKey, {
    url: optimized,
    expiresAt: now + CACHE_TTL_MS,
  });

  return optimized;
};

/**
 * Synchronously return a cached optimized URL if available and not expired.
 * This avoids async calls when a URL was already generated earlier in the session.
 */
export const getCachedOptimizedImageUrl = (
  imageLocation: ImageType,
  options?: {
    quality?: number;
    format?: "webp" | "jpg" | "png";
    width?: number;
    height?: number;
  },
) => {
  const image = isString(imageLocation) ? imageLocation : "";
  if (!image) return null;

  const makeCacheKey = (img: string, opts?: typeof options) =>
    `${img}::w${opts?.width ?? ""}::h${opts?.height ?? ""}::q${
      opts?.quality ?? 50
    }::f${opts?.format ?? "webp"}`;

  if (!(global as any).__optimizedImageUrlCache) return null;

  const imageUrlCache: Map<string, { url: string; expiresAt: number }> = (
    global as any
  ).__optimizedImageUrlCache;

  const cacheKey = makeCacheKey(image, options);
  const entry = imageUrlCache.get(cacheKey);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    imageUrlCache.delete(cacheKey);
    return null;
  }

  return entry.url;
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

export const toggleActivityReaction = async (
  activityId: string,
  reaction: "like" | "dislike",
  userId: string,
) => {
  const { data, error } = await supabase.rpc("toggle_reaction", {
    p_activity_id: activityId,
    p_user_id: userId,
    p_reaction: reaction,
  });

  if (error) console.log("RPC error â†’", error);
  return data;
};

export const getActivityReactions = async (activityId: string) => {
  const { data, error } = await supabase
    .from("activities")
    .select("likes, dislikes")
    .eq("id", activityId)
    .single();

  if (error) throw error;

  return data;
};

export const getUserReaction = async (activityId: string, userId: string) => {
  const { data, error } = await supabase
    .from("user_activity_reactions")
    .select("reaction")
    .eq("activity_id", activityId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) return null;
  return data?.reaction ?? null;
};

// -------------------------
// Activity comments (CRUD)
// -------------------------

/**
 * Get profile by id (lightweight)
 */
export const getCommentsByActivityId = async (activityId: string) => {
  if (!activityId) return [];

  const { data, error } = await supabase
    .from("activity_comments")
    .select(
      "id, activity_id, user_id, text, created_at, updated_at, parent_comment_id",
    )
    .eq("activity_id", activityId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  const comments = (data || []).map((c: any) => ({
    id: c.id,
    activityid: c.activity_id,
    user_id: c.user_id,
    text: c.text,
    created_at: c.created_at,
    updated_at: c.updated_at,
    parentCommentId: c.parent_comment_id || null,
  }));

  return comments;
};

export const postComment = async (
  activityId: string,
  userId: string,
  text: string,
  parentCommentId?: string | null,
) => {
  if (!activityId || !userId || !text)
    throw new Error("Missing required fields");

  const insertObj: any = {
    activity_id: activityId,
    user_id: userId,
    text,
  };

  if (parentCommentId) insertObj.parent_comment_id = parentCommentId;

  const { data, error } = await supabase
    .from("activity_comments")
    .insert([insertObj])
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    activityid: data.activity_id,
    user_id: data.user_id,
    text: data.text,
    created_at: data.created_at,
    updated_at: data.updated_at,
    parentCommentId: data.parent_comment_id || null,
  };
};

export const updateComment = async (
  commentId: string,
  userId: string,
  text: string,
) => {
  if (!commentId || !userId || !text)
    throw new Error("Missing required fields");

  const { data, error } = await supabase
    .from("activity_comments")
    .update({ text })
    .eq("id", commentId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    activityid: data.activity_id,
    user_id: data.user_id,
    text: data.text,
    created_at: data.created_at,
    updated_at: data.updated_at,
    parentCommentId: data.parent_comment_id || null,
  };
};

export const deleteComment = async (commentId: string, userId: string) => {
  if (!commentId || !userId) throw new Error("Missing required fields");

  const { data, error } = await supabase
    .from("activity_comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", userId)
    .select();

  if (error) throw error;

  return data;
};
