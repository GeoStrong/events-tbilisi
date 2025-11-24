import { useEffect, useState } from "react";
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
  const categoryId = searchParams.get("category");

  useEffect(() => {
    if (categoryId) {
      (async () => {
        const activities = await getActivitiesByCategoryId(categoryId);
        setActivities(activities);
      })();
    } else {
      (async () => {
        const activities = await getActivities();
        setActivities(activities);
      })();
    }
  }, [categoryId]);

  useEffect(() => {
    (async () => {
      const category =
        categoryId && ((await getCategoryById(categoryId)) as Category[]);
      setCategory(category || []);
    })();
  }, [categoryId]);

  useEffect(() => {
    const activityId = searchParams.get("activity")!;
    if (activityId || activities) {
      const activity = activities?.find(
        (activity) => activity.id === activityId,
      );
      setActiveActivity(activity || null);
    }
  }, [activities, searchParams]);

  useEffect(() => {
    const locations =
      activities &&
      activities
        .filter((activity) => activity.googleLocation !== undefined)
        .map((activity) => {
          return {
            key: `activity-${activity.id}`,
            location: activity.googleLocation!,
          };
        });

    setActivityLocations(locations || null);
  }, [activities]);

  return { activities, category, activeActivity, activityLocations };
};
export default useActivitiesFilter;
