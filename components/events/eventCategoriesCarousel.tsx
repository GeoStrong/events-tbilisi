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
      <h2 className="section-title">Discover Categories</h2>
      <div className="mt-5">
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent className="pb-2">
            {categories.map((category) => (
              <CarouselItem
                className="w-24 basis-1/4 sm:basis-1/4 md:w-28 md:basis-[10%] lg:basis-1/12"
                key={category.id}
              >
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
