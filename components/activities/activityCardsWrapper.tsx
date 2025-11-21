"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Category, ActivityEntity } from "@/lib/types";
import ActivityCard from "./activityCard";
import ActivityDescription from "./activityDescription";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import { usePathname } from "next/navigation";
import Spinner from "../general/spinner";
import {
  getActivities,
  getCategoryById,
  getActivitiesByCategoryId,
} from "@/lib/functions/supabaseFunctions";
import ActivityCardsLoading from "./activityCardsLoading";

const ActivityCards: React.FC = () => {
  const [activities, setActivities] = useState<ActivityEntity[] | null>(null);
  const [category, setCategory] = useState<Category[]>([]);
  const [activeActivity, setActiveActivity] = useState<ActivityEntity | null>(
    null,
  );
  const [gridStyles, setGridStyles] = useState<string>("");
  const pathname = usePathname();
  const { searchParams, handleSearch } = useAddSearchQuery();
  const triggerRef = useRef<HTMLButtonElement>(null!);
  const categoryId = searchParams.get("category");

  const openDrawer = () => {
    setTimeout(() => {
      triggerRef?.current.click();
    }, 1);
  };

  useEffect(() => {
    if (activeActivity) openDrawer();
  }, [activeActivity]);

  useEffect(() => {
    setGridStyles(
      pathname === "/map"
        ? "lg:grid-cols-1"
        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    );
  }, [pathname]);

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

  return (
    <>
      <h2 className="section-title mt-3 md:mt-1">
        {categoryId && category.length !== 0 ? category[0].name : "Recent"}{" "}
        activities in Tbilisi
      </h2>
      {activities === null && (
        <div className="mt-5">
          <Spinner />
        </div>
      )}
      {activities?.length === 0 ? (
        <p className="mt-3 text-center">
          No activities found for the selected category. Try another{" "}
          <span className="text-primary">category</span>.
        </p>
      ) : (
        <div className={`mt-3 grid gap-5 ${gridStyles}`}>
          {activities?.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              setSearchParams={handleSearch}
            />
          ))}
          {activeActivity && pathname !== "/map" && (
            <ActivityDescription
              buttonRef={triggerRef}
              activity={activeActivity}
              setSearchParams={handleSearch}
            />
          )}
        </div>
      )}
    </>
  );
};

const ActivityCardsWrapper: React.FC = () => (
  <Suspense fallback={<ActivityCardsLoading />}>
    <ActivityCards />
  </Suspense>
);

export default ActivityCardsWrapper;
