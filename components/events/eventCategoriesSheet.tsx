import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { categories } from "@/lib/fakeData/categories";
import EventCategory from "./eventCategory";

const EventCategoriesSheet: React.FC = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="flex justify-center">
          <div className="rounded-lg border bg-gray-50 p-4 duration-300 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-900">
            Open Categories
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>All categories</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="grid grid-cols-4 gap-4">
              {categories.map((category) => (
                <EventCategory key={category.id} category={category} />
              ))}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EventCategoriesSheet;
