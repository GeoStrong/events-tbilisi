"use client";

import { categories } from "@/lib/data/categories";
import React, { Suspense, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ActivityCard from "../activities/activityCard";
import { Label } from "../ui/label";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import useActivitiesFilter from "@/lib/hooks/useActvitiesFilter";
import { useLocation } from "react-use";

const DiscoverLayout: React.FC = () => {
  const { activities } = useActivitiesFilter();
  const { handleSearch, searchParams } = useAddSearchQuery();
  const location = useLocation();

  console.log(location);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get("date") || "",
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")
      ? searchParams.get("categories")!.split(",")
      : [],
  );

  const toggleCategory = (cat: string) => {
    let updated = [...selectedCategories];

    if (updated.includes(cat)) {
      updated = updated.filter((c) => c !== cat);
    } else {
      updated.push(cat);
    }

    setSelectedCategories(updated);
    handleSearch("categories", updated.length ? updated.join(",") : "");
  };

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

  const clearFilters = () => {
    setSearch("");
    setSelectedDate("");
    setSelectedCategories([]);
    handleSearch("search", "");
    handleSearch("categories", "");
    handleSearch("date", "");
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-8 text-4xl font-bold md:text-5xl">
        Discover Activities
      </h1>

      <div className="flex w-full flex-col gap-8 md:flex-row">
        <div className="h-fit w-full rounded-xl bg-white p-4 shadow-md dark:bg-gray-900 md:w-64">
          <Button
            onClick={clearFilters}
            variant="outline"
            className="mb-4 flex w-full justify-between rounded-lg border px-4 py-2"
          >
            <span>Cancel all filters</span> <span>×</span>
          </Button>

          <h2 className="mb-4 font-semibold">Select Category</h2>

          <div className="flex h-44 flex-col gap-3 overflow-y-auto pr-2">
            {categories.map((category) => (
              <Label
                key={category.name}
                className="flex cursor-pointer items-center gap-3"
              >
                <Input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => toggleCategory(category.name)}
                  className="h-4 w-4"
                />
                {category.name}
              </Label>
            ))}
          </div>
        </div>

        {/* RIGHT MAIN AREA */}
        <div className="flex-1">
          <div className="mb-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center">
              <Input
                placeholder="Search for an activity: name / location..."
                className="h-12 flex-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={() => handleSearch("search", search)}
                className="h-12 w-full md:w-auto"
              >
                Search
              </Button>
            </div>

            {/* QUICK DATE FILTERS + DATE PICKER */}
            <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex gap-2 overflow-x-auto">
                {["Today", "Tomorrow", "Weekend", "This month", "All"].map(
                  (b) => (
                    <Button
                      key={b}
                      variant="outline"
                      onClick={() => setQuickDate(b)}
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
                onChange={(e) => onDateSelect(e.target.value)}
                className="w-full md:w-[20%]"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* ACTIVITIES GRID */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {activities?.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
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
