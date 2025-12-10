"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import MapWrapper from "@/components/map/map";
import DisplayActivitiesBtnWrapper from "@/components/map/displayActivitiesBtn";
import ActivityDescription from "@/components/activities/activityDescription";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import MapLoadingLayout from "./mapLayoutLoading";
import { useDispatch } from "react-redux";
import { mapActions } from "@/lib/store/mapSlice";
import { ActivityEntity } from "@/lib/types";
import { getActivities } from "@/lib/functions/supabaseFunctions";

interface MapLayoutProps {
  mapKey: string;
}

const MapLayout: React.FC<MapLayoutProps> = ({ mapKey }) => {
  const activityButtonRef = useRef<HTMLButtonElement>(null!);
  const { searchParams, handleReplace } = useAddSearchQuery();
  const dispatch = useDispatch();
  const [activities, setActivities] = useState<ActivityEntity[] | []>([]);

  useEffect(() => {
    (async () => {
      const activities = (await getActivities()) as ActivityEntity[];
      setActivities(activities);
    })();
  }, []);

  const activityId = searchParams.get("activity");
  const activeActivity = activityId
    ? activities.find((e) => e.id === activityId)
    : null;

  useEffect(() => {
    dispatch(mapActions.setIsFloatingEnabled(false));
  }, [dispatch]);

  // Drawer is now controlled by `open` prop; no need to programmatically click

  const setSearchParams = (query: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }
    handleReplace(params);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 rounded-md bg-white dark:bg-gray-800 md:mt-3 lg:flex-row">
        <div className="absolute -top-40 left-0 w-full rounded-2xl md:static">
          <MapWrapper API_KEY={mapKey} />
        </div>
        <div className="fixed bottom-16 left-0 flex w-full justify-center">
          <DisplayActivitiesBtnWrapper />
        </div>
      </div>
      {activeActivity && (
        <ActivityDescription
          buttonRef={activityButtonRef}
          activity={activeActivity}
          setSearchParams={setSearchParams}
          open={Boolean(activeActivity)}
        />
      )}
    </>
  );
};

const MapLayoutWrapper: React.FC<MapLayoutProps> = ({ mapKey }) => (
  <Suspense fallback={<MapLoadingLayout />}>
    <MapLayout mapKey={mapKey} />
  </Suspense>
);

export default MapLayoutWrapper;
