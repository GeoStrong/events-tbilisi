"use client";

import { categories } from "@/lib/data/categories";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ActivityCard from "../activities/activityCard";
import { Label } from "../ui/label";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import useActivitiesFilter from "@/lib/hooks/useActvitiesFilter";

const DiscoverLayout: React.FC = () => {
  const { activities } = useActivitiesFilter();
  const { handleSearch, searchParams } = useAddSearchQuery();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="p-8">
      <h1 className="mb-8 text-5xl font-bold">Discover Activities</h1>

      <div className="flex w-full flex-col gap-8 md:flex-row">
        <div className="h-fit w-64 rounded-xl bg-white p-4 shadow-sm">
          <Button
            variant="outline"
            className="mb-4 flex w-full justify-between rounded-lg border px-4 py-2"
          >
            <span>Cancel all filters</span> <span>×</span>
          </Button>

          <h2 className="mb-4 font-semibold">Select Category</h2>

          <div className="flex h-40 flex-col gap-3 overflow-y-scroll">
            {categories.map((category) => (
              <Label
                key={category.name}
                onClick={() => {}}
                className="flex items-center gap-3"
              >
                <Input type="checkbox" className="h-3 w-3" /> {category.name}
              </Label>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                placeholder="Search for an activity: name / location..."
                className="h-12"
              />
              <Button
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  if (query) params.set("q", query);
                  else params.delete("q");
                  router.push(`?${params.toString()}`);
                }}
                className="h-12"
              >
                Search
              </Button>
            </div>

            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex gap-2 overflow-x-auto">
                {["Today", "Tomorrow", "Weekend", "This month", "All"].map(
                  (b) => (
                    <Button
                      key={b}
                      variant="outline"
                      className="whitespace-nowrap rounded-full border px-4 py-2"
                    >
                      {b}
                    </Button>
                  ),
                )}
              </div>

              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="hidden w-[15%] md:block"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {activities?.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverLayout;
