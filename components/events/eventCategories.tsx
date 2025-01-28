"use client";

import { categories } from "@/lib/fakeData/categories";
import React, { Suspense } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import type { EventCategories } from "@/lib/types";

const Categories: React.FC = () => {
  const { handleSearch, searchParams } = useAddSearchQuery();

  const getActiveCategoryStyles = (category: string, categoryColor: string) => {
    const activeCategory = searchParams.get("category");
    if (activeCategory === category) {
      return `border-${categoryColor} text-${categoryColor}`;
    }
  };

  return (
    <>
      <h2 className="section-title">Discover Categories</h2>
      <div className="mt-5">
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent className="pb-2">
            {categories.map((category) => (
              <CarouselItem
                className="w-24 basis-1/4 sm:basis-1/4 md:w-28 md:basis-[10%] lg:basis-1/12"
                key={category.id}
              >
                <div className="flex flex-col items-center gap-2">
                  <button
                    className={`flex h-14 w-14 items-center justify-center rounded-full border-[3px] bg-gray-100 p-3 dark:bg-gray-800 ${getActiveCategoryStyles(category.name, category.color)}`}
                    onClick={() => {
                      handleSearch("category", category.name);
                    }}
                  >
                    <category.icon className={`text-inherit`} />
                  </button>
                  <span className="text-sm">{category.name}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

const EventCategories: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Categories />
    </Suspense>
  );
};

export default EventCategories;
