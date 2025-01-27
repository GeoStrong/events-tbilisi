import categories from "@/lib/fakeData/categories";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
const EventCategories: React.FC = () => {
  return (
    <>
      <h2 className="section-title">Discover Categories</h2>
      <div className="mt-5">
        <Carousel opts={{ dragFree: true, loop: true }}>
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem
                className="basis-1/8 w-24 md:w-28"
                key={category.id}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`bg-${category.color} rounded-full p-3`}>
                    <category.icon className="text-white dark:text-black" />
                  </div>
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
export default EventCategories;
