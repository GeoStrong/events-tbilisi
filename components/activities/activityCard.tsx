"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import defaultActivityImg from "@/public/images/default-activity-img.png";
import { Category, ActivityEntity } from "@/lib/types";
import Link from "next/link";
import { ImLocation2 } from "react-icons/im";
import {
  getCategoriesByActivityId,
  getImageUrl,
} from "@/lib/functions/supabaseFunctions";
import { BiTimeFive } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import useMapZoom from "@/lib/hooks/useMapZoom";

interface ActivityCardProps {
  activity: ActivityEntity;
  setSearchParams?: (query: string, value: string) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  setSearchParams,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activityImage, setActivityImage] = useState<string | null>();
  const { handleLocationClick } = useMapZoom(activity.id);

  useEffect(() => {
    (async () => {
      const categories = await getCategoriesByActivityId(activity.id);
      setCategories(categories || []);
    })();
  }, [activity.id]);

  useEffect(() => {
    (async () => {
      const imageUrl = await getImageUrl(activity.image);

      setActivityImage(imageUrl);
    })();
  }, [activity.image]);

  return (
    <Card
      className="h-96 cursor-pointer duration-300 dark:border-gray-600 dark:bg-gray-900"
      onClick={() => {
        if (setSearchParams)
          return setSearchParams("activity", activity.id.toString());
      }}
      key={activity.id}
    >
      <CardHeader className="relative p-0">
        <div className="group relative h-48 w-full overflow-hidden rounded-t-xl bg-white">
          <Image
            src={activityImage || defaultActivityImg.src}
            width={100}
            height={100}
            alt="activity"
            className={`h-full w-full transform rounded-t-xl transition-transform duration-300 group-hover:scale-105 ${!activityImage ? "object-contain" : "object-cover"}`}
            unoptimized={activityImage ? false : true}
          />
        </div>
        <div className="absolute top-0 flex h-4 w-full justify-end px-2 text-right">
          <div className="flex w-2/3 flex-wrap items-center justify-end gap-2">
            {categories.map((category) => (
              <span
                key={category.id}
                className={`rounded-full text-center bg-${category.color} px-3 py-1 text-sm text-white`}
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <CardTitle className="px-6 text-xl">{activity.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between pb-0">
        <p className="text-lg">
          {activity.location && activity.location.toLocaleString()}
        </p>
        <p className="text-muted-foreground">{activity.hostName}</p>
        {activity.googleLocation && (
          <Link
            href="/map"
            onClick={(e) => {
              e.stopPropagation();
              if (activity.googleLocation) {
                handleLocationClick(activity.googleLocation);
              }
            }}
            className="rounded-md border border-primary bg-transparent p-2"
          >
            <ImLocation2 className="text-primary" />
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3">
        <p className="flex items-center gap-1 text-base text-muted-foreground">
          <BiTimeFive />
          {activity.time && activity.time.toLocaleString()}
        </p>
        <p className="flex items-center gap-1 text-base text-muted-foreground">
          <MdDateRange />
          {activity.date &&
            new Date(activity.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
              weekday: "short",
              day: "numeric",
            })}
        </p>
      </CardFooter>
    </Card>
  );
};
export default ActivityCard;
