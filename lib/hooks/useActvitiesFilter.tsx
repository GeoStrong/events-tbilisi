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

  // params
  const categoryCSV = searchParams.get("categories");
  const activityId = searchParams.get("activity");
  const search = searchParams.get("search")?.toLowerCase() || "";
  const date = searchParams.get("date") || "";
  const singleCategoryId = searchParams.get("category");

  // stable categories
  const selectedCategories = useMemo(() => {
    return categoryCSV ? categoryCSV.split(",") : [];
  }, [categoryCSV]);

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

  // --------------------------------------------------------------------
  // 1️⃣ Fetch base activities: by category (if any) or all activities
  // --------------------------------------------------------------------
  useEffect(() => {
    const loadActivities = async () => {
      let baseActivities: ActivityEntity[] = [];

      if (selectedCategories.length > 0) {
        const results = await Promise.all(
          selectedCategories.map((id) => getActivitiesByCategoryId(id)),
        );
        baseActivities = results.flat();
      } else {
        baseActivities = (await getActivities()) ?? [];
      }

      // 🔎 2️⃣ apply search filter
      if (search) {
        baseActivities = baseActivities.filter((a) =>
          `${a.title} ${a.location} ${a.description}`
            .toLowerCase()
            .includes(search),
        );
      }

      // 📅 3️⃣ apply date filter
      if (date) {
        baseActivities = baseActivities.filter(
          (a) => a.date?.toString().split("T")[0] === date,
        );
      }

      setActivities(baseActivities);
    };

    loadActivities();
  }, [selectedCategories, search, date]);

  // --------------------------------------------------------------------
  // 2️⃣ Load category title (optional)
  // --------------------------------------------------------------------
  useEffect(() => {
    const loadCategory = async () => {
      if (selectedCategories.length === 1) {
        const result = await getCategoryById(selectedCategories[0]);
        setCategory((result as Category[]) ?? []);
      } else {
        setCategory([]);
      }
    };

    loadCategory();
  }, [selectedCategories]);

  // --------------------------------------------------------------------
  // 3️⃣ Active activity
  // --------------------------------------------------------------------
  useEffect(() => {
    if (!activities) return;

    const activity = activities.find((a) => a.id === activityId) || null;
    setActiveActivity(activity);
  }, [activities, activityId]);

  // --------------------------------------------------------------------
  // 4️⃣ Map locations
  // --------------------------------------------------------------------
  useEffect(() => {
    if (!activities) return;

    const locations =
      activities
        .filter((a) => a.googleLocation)
        .map((a) => ({
          key: `activity-${a.id}`,
          location: a.googleLocation!,
        })) || null;

    setActivityLocations(locations);
  }, [activities]);

  console.log(activities);

  return {
    activities,
    category,
    activeActivity,
    activityLocations,
  };
};

export default useActivitiesFilter;
