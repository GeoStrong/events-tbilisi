"use client";

import React, { Suspense } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import EventCategory from "./eventCategory";
import { Category } from "@/lib/types";
import EventCategoriesCarouselLoading from "./EventCategoriesCarouselLoading";

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <>
      <div className="sticky top-[3.3rem] z-50 border-b bg-white px-2 py-4 dark:border-gray-600 dark:bg-gray-900 md:px-20">
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent className="">
            {categories.map((category) => (
              <CarouselItem className="basis-auto pl-2" key={category.id}>
                <EventCategory category={category} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

const EventCategoriesCarousel: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <Suspense fallback={<EventCategoriesCarouselLoading />}>
      <Categories categories={categories} />
    </Suspense>
  );
};

export default EventCategoriesCarousel;
