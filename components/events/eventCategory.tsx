import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import { Category } from "@/lib/types";
import React from "react";

const EventCategory: React.FC<{ category: Category }> = ({ category }) => {
  const { handleSearch, searchParams } = useAddSearchQuery();

  const activeCategory = searchParams.get("category");

  const getActiveCategoryStyles = (category: string, categoryColor: string) => {
    if (activeCategory === category) {
      return `border-${categoryColor} text-${categoryColor}`;
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        className={`flex h-14 w-14 items-center justify-center rounded-full border-[3px] bg-gray-100 p-3 dark:bg-gray-800 ${getActiveCategoryStyles(category.name, category.color)}`}
        onClick={() => {
          if (activeCategory && activeCategory === category.name)
            return handleSearch("category", "");
          return handleSearch("category", category.name);
        }}
      >
        <category.icon className={`text-inherit`} />
      </button>
      <span className="text-sm">{category.name}</span>
    </div>
  );
};
export default EventCategory;
