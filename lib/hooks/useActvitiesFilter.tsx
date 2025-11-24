import { useEffect, useMemo, useState } from "react";
import { ActivityEntity, Category, Poi } from "../types";
import useAddSearchQuery from "./useAddSearchQuery";
import {
  getActivities,
  getActivitiesByCategoryId,
  getCategoryById,
} from "../functions/supabaseFunctions";

const useActivitiesFilter = () => {
  const [activities, setActivities] = useState<ActivityEntity[] | null>(null);
  const [category, setCategory] = useState<Category[]>([]);
  const [activeActivity, setActiveActivity] = useState<ActivityEntity | null>(
    null,
  );
  const [activityLocations, setActivityLocations] = useState<Poi[] | null>(
    null,
  );

  const { searchParams } = useAddSearchQuery();

  // --- Extract filters from URL ---
  const searchValue = searchParams.get("search")?.toLowerCase() || "";
  const categoryCSV = searchParams.get("categories");
  const selectedCategories = categoryCSV ? categoryCSV.split(",") : [];
  const dateParam = searchParams.get("date");

  const activityId = searchParams.get("activity");
  const singleCategoryId = searchParams.get("category");

  // --- Fetch activities ---
  useEffect(() => {
    (async () => {
      if (singleCategoryId) {
        const activities = await getActivitiesByCategoryId(singleCategoryId);
        setActivities(activities);
      } else {
        const activities = await getActivities();
        setActivities(activities);
      }
    })();
  }, [singleCategoryId]);

  // --- Fetch category info ---
  useEffect(() => {
    (async () => {
      const data =
        singleCategoryId &&
        ((await getCategoryById(singleCategoryId)) as Category[]);
      setCategory(data || []);
    })();
  }, [singleCategoryId]);

  // --- Filtering Logic ---
  const filteredActivities = useMemo(() => {
    if (!activities) return null;

    return activities.filter((activity) => {
      // --- TEXT SEARCH ---
      if (searchValue) {
        const target =
          `${activity.title} ${activity.description} ${activity.location}`.toLowerCase();
        if (!target.includes(searchValue)) return false;
      }

      // --- MULTI CATEGORY FILTER ---
      if (selectedCategories.length > 0) {
        const actCats =
          activity.categories?.map((c: string | Category) =>
            typeof c === "string" ? c : c.name,
          ) ?? [];

        const match = selectedCategories.some((cat) => actCats.includes(cat));
        if (!match) return false;
      }

      // --- DATE FILTER ---
      if (dateParam) {
        const actDate = new Date(activity.date as Date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Specific date
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
          const selected = new Date(dateParam);
          if (actDate.toDateString() !== selected.toDateString()) return false;
        }

        if (dateParam === "weekend") {
          const day = actDate.getDay();
          if (day !== 6 && day !== 0) return false; // Sat or Sun
        }

        if (dateParam === "month") {
          const nowMonth = today.getMonth();
          const nowYear = today.getFullYear();
          if (
            actDate.getMonth() !== nowMonth ||
            actDate.getFullYear() !== nowYear
          )
            return false;
        }
      }

      return true;
    });
  }, [activities, searchValue, selectedCategories, dateParam]);

  // --- Active activity ---
  useEffect(() => {
    if (!filteredActivities) return;

    if (activityId) {
      const found = filteredActivities.find((a) => a.id === activityId) || null;

      setActiveActivity((prev) => {
        // avoid state update if value is identical
        if (JSON.stringify(prev) === JSON.stringify(found)) return prev;
        return found;
      });
    } else {
      setActiveActivity((prev) => {
        if (prev === null) return prev;
        return null;
      });
    }
  }, [filteredActivities, activityId]);

  // --- Map locations ---
  useEffect(() => {
    if (!filteredActivities) return;

    const locations = filteredActivities
      .filter((a) => a.googleLocation)
      .map((a) => ({
        key: `activity-${a.id}`,
        location: a.googleLocation!,
      }));

    setActivityLocations((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(locations)) return prev;
      return locations;
    });
  }, [filteredActivities]);

  return {
    activities: filteredActivities,
    category,
    activeActivity,
    activityLocations,
  };
};

export default useActivitiesFilter;
