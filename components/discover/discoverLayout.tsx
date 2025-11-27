"use client";

import React, { Suspense, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ActivityCard from "../activities/activityCard";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import useActivitiesFilter from "@/lib/hooks/useActvitiesFilter";
import DiscoverSearch from "./discoverSearch";
import DiscoverFilters from "./discoverFilters";
import { redirect } from "next/navigation";

const DiscoverLayout: React.FC = () => {
  const { activities } = useActivitiesFilter();
  const { handleSearch, searchParams } = useAddSearchQuery();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get("date") || "",
  );

  const onDateSelect = (value: string) => {
    setSelectedDate(value);
    handleSearch("date", value);
  };

  const setQuickDate = (type: string) => {
    const today = new Date();

    const format = (d: Date) => d.toISOString().split("T")[0];

    if (type === "Today") {
      const d = format(today);
      setSelectedDate(d);
      handleSearch("date", d);
      return;
    }

    if (type === "Tomorrow") {
      const d = new Date(today.setDate(today.getDate() + 1));
      const f = format(d);
      setSelectedDate(f);
      handleSearch("date", f);
      return;
    }

    if (type === "Weekend") {
      handleSearch("date", "weekend");
      setSelectedDate("");
      return;
    }

    if (type === "This month") {
      handleSearch("date", "month");
      setSelectedDate("");
      return;
    }

    if (type === "All") {
      setSelectedDate("");
      handleSearch("date", "");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-8 text-4xl font-bold md:text-5xl">
        Discover Activities
      </h1>

      <div className="flex w-full flex-col gap-8 md:flex-row">
        <DiscoverFilters
          setSearch={setSearch}
          setSelectedDate={setSelectedDate}
        />

        <div className="flex-1">
          <div className="mb-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
            <div className="mb-6 md:block">
              <DiscoverSearch search={search} onSearch={setSearch} />
            </div>

            <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:overflow-x-auto">
                {["Today", "Tomorrow", "Weekend", "This month", "All"].map(
                  (b) => (
                    <Button
                      key={b}
                      variant="outline"
                      onClick={() => setQuickDate(b)}
                      className="whitespace-nowrap rounded-full border px-4 py-2 dark:bg-gray-700"
                    >
                      {b}
                    </Button>
                  ),
                )}
              </div>

              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => onDateSelect(e.target.value)}
                className="w-full dark:bg-gray-700 md:w-[20%]"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {activities?.length === 0 && (
            <p className="w-full text-center text-xl">No activities found</p>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {activities?.map((activity) => (
              <div
                key={activity.id}
                className=""
                onClick={() => {
                  redirect(`/activities/${activity.id}`);
                }}
              >
                <ActivityCard activity={activity} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DiscoverLayoutWrapper: React.FC = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <DiscoverLayout />
    </Suspense>
  );
};
export default DiscoverLayoutWrapper;
