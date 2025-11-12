"use client";

import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import { Category } from "@/lib/types";
import React, { useEffect, useState } from "react";
import DynamicIcon from "../ui/dynamicIcon";
import { Badge } from "../ui/badge";
import { getEventsByCategoryId } from "@/lib/functions/supabaseFunctions";

const EventCategory: React.FC<{ category: Category }> = ({ category }) => {
  const { handleSearch, searchParams } = useAddSearchQuery();
  const [eventQuantity, setEventQuantity] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const eventsByCategory = await getEventsByCategoryId(category.id);
      setEventQuantity(eventsByCategory.length);
    })();
  }, [category.id]);

  const activeCategory = searchParams.get("category");

  const cateogryIsActive = activeCategory && activeCategory === category.id;

  const getActiveCategoryStyles = (category: string, categoryColor: string) => {
    if (activeCategory === category) {
      return `bg-${categoryColor} text-white`;
    }
  };

  return (
    <div className="px-2">
      <button
        className={`relative flex items-center justify-between gap-3 rounded-lg border px-3 py-1 dark:border-gray-600 ${getActiveCategoryStyles(category.id.toLocaleString(), category.color)}`}
        onClick={() => {
          if (cateogryIsActive) return handleSearch("category", "");
          return handleSearch("category", category.id.toLocaleString());
        }}
      >
        {eventQuantity > 0 && (
          <Badge
            className={`${cateogryIsActive ? `border-[1px] border-${category.color}/80 bg-white text-${category.color}` : `bg-${category.color} text-white`} hover:bg-${category.color} absolute -right-3 -top-0 flex w-1 items-center justify-center rounded-full text-[10px] font-medium`}
          >
            {eventQuantity}
          </Badge>
        )}
        <DynamicIcon name={category.icon} />
        <span className="text-sm">{category.name}</span>
      </button>
    </div>
  );
};
export default EventCategory;
