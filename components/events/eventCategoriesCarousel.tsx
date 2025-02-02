"use client";

import { categories } from "@/lib/fakeData/categories";
import React, { Suspense } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import EventCategory from "./eventCategory";

const Categories: React.FC = () => {
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

const EventCategoriesCarousel: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Categories />
    </Suspense>
  );
};

export default EventCategoriesCarousel;
