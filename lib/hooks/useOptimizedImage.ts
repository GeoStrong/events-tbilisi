/**
 * Hook for using optimized images in components
 * Handles async image fetching with proper loading states
 */

import { useEffect, useState } from "react";
import {
  getOptimizedImageUrl,
  getCachedOptimizedImageUrl,
} from "@/lib/functions/supabaseFunctions";
import type { ImageType } from "@/lib/types";

interface UseOptimizedImageOptions {
  quality?: number;
  format?: "webp" | "jpg" | "png";
  width?: number;
  height?: number;
  fallback?: string;
}

export const useOptimizedImage = (
  imageLocation: ImageType,
  options: UseOptimizedImageOptions = {},
) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!imageLocation) {
      setImageUrl(options.fallback || "");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    // Try to read a synchronous cache entry to avoid loading flicker
    let hadCache = false;
    try {
      const cached = getCachedOptimizedImageUrl(imageLocation, {
        quality: options.quality,
        format: options.format,
        width: options.width,
        height: options.height,
      });

      if (cached) {
        hadCache = true;
        setImageUrl(cached);
        setIsLoading(false);
        // continue to fetch in background to refresh cache if needed
      }
    } catch (e) {
      // ignore cache errors and proceed to fetch
    }

    const fetchImage = async () => {
      try {
        // Only set loading if we don't already have a cached URL
        if (!hadCache) setIsLoading(true);

        const url = await getOptimizedImageUrl(imageLocation, {
          quality: options.quality,
          format: options.format,
          width: options.width,
          height: options.height,
        });

        if (isMounted) {
          setImageUrl(url || options.fallback || "");
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
          setImageUrl(options.fallback || "");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [
    imageLocation,
    options.quality,
    options.format,
    options.width,
    options.height,
    options.fallback,
  ]);

  return { imageUrl, isLoading, error };
};

export default useOptimizedImage;
