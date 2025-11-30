"use client";

import { Category, ActivityEntity, UserProfile } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultActivityImg from "@/public/images/default-activity-img.png";
import ActivityDetails from "./activityDetails";
import Link from "next/link";
import Socials from "../general/socials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiUser } from "react-icons/bi";
import { Button } from "../ui/button";
import { CiShare1 } from "react-icons/ci";
import {
  getImageUrl,
  getActivitiesByCategoryId,
} from "@/lib/functions/supabaseFunctions";
import { Badge } from "../ui/badge";
import useMapZoom from "@/lib/hooks/useMapZoom";
import { fetchUserInfo } from "@/lib/profile/profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import MapWrapper from "../map/map";

interface ActivityBodyProps {
  categories: Category[];
  activity: ActivityEntity;
}

const ActivityBody: React.FC<ActivityBodyProps> = ({
  activity,
  categories,
}) => {
  const [activityImage, setActivityImage] = useState<string>();
  const [similarActivities, setSimilarActivities] = useState<ActivityEntity[]>(
    [],
  );
  const { handleLocationClick } = useMapZoom(activity.id);
  const [host, setHost] = useState<UserProfile | null>();
  const [hostImage, setHostImage] = useState<string | null>();
  const { user } = useGetUserProfile();
  const [mapKey, setMapKey] = useState<string>("");

  useEffect(() => {
    (async () => {
      const imageUrl = await getImageUrl(activity.image);
      const activities = await getActivitiesByCategoryId(
        categories[0].id.toLocaleString(),
      );
      const host = (await fetchUserInfo(activity.user_id!)) as UserProfile;
      const hostImg = await getImageUrl(host.avatar_path || "");

      setActivityImage(imageUrl!);
      setSimilarActivities(activities);
      setHost(host);
      setHostImage(hostImg);
    })();
  }, [categories, activity.image, activity.user_id]);

  useEffect(() => {
    fetch("/api/use-secret")
      .then((res) => res.json())
      .then((data) => setMapKey(data));
  }, []);

  return (
    <div className="mb-10 mt-5 flex w-full flex-col gap-5 md:flex-row">
      <div className="md:w-3/4">
        <div className="flex flex-col gap-5 rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 md:px-6">
          <div className="rounded-md">
            <Dialog>
              <DialogTrigger className="w-full">
                <Image
                  src={activityImage || defaultActivityImg.src}
                  width={100}
                  height={100}
                  alt="activity"
                  className={`max-h-96 w-full rounded-md object-center ${activity.image ? "object-cover" : "object-contain"}`}
                  unoptimized
                />
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                    <Image
                      src={activityImage || defaultActivityImg.src}
                      width={0}
                      height={0}
                      alt="activity"
                      className={`w-full rounded-md object-center ${activity.image ? "object-cover" : "object-contain"}`}
                      unoptimized
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full">
            <h3 className="my-3 text-base font-semibold md:text-xl">
              About the activity
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <span
                    key={category.id}
                    className={`rounded-full bg-${category.color} px-2 py-1 text-sm text-white`}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              <Badge
                variant={`${activity.status === "active" ? "success" : activity.status === "inactive" ? "destructive" : "default"}`}
              >
                {activity.status?.toUpperCase()}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground md:text-lg">
              {activity.description}
            </p>
            <h3 className="mt-3 text-base font-semibold md:text-xl">
              Activity Details:
            </h3>
            <div className="mt-2 flex w-full flex-col justify-between md:flex-row">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ActivityDetails
                    detail="📍 Address"
                    value={activity.location}
                  />
                  <Link
                    href="/map"
                    className="text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (activity.googleLocation) {
                        handleLocationClick(activity.googleLocation);
                      }
                    }}
                  >
                    See Map ↗️
                  </Link>
                </div>
                <ActivityDetails
                  detail="⌚ Time"
                  value={activity.time as string}
                />
                <ActivityDetails
                  detail="📅 Date"
                  value={
                    activity.date &&
                    new Date(activity.date).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                      weekday: "short",
                      day: "numeric",
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-2">
              {activity.tags &&
                activity.tags.map((tag) => (
                  <span key={tag} className="font-bold">
                    #{tag}
                  </span>
                ))}
            </div>
            <h3 className="mt-3 text-base font-semibold md:text-xl">
              Share with your friends
            </h3>
            <Socials />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 md:w-1/4">
        <div className="max-h-40 rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 lg:col-span-1">
          <h3 className="font-bold md:text-lg">Host</h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={hostImage || ""}
                className="object-cover object-top"
              />
              <AvatarFallback>
                <BiUser />
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-center text-base">{host?.name}</span>
              {user?.id === activity.user_id ? (
                <Link
                  href="/profile#account"
                  className="w-full rounded-md border p-2 text-center dark:border-gray-600"
                >
                  Edit Profile
                </Link>
              ) : (
                <Button className="text">Follow</Button>
              )}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 lg:col-span-1">
          <h3 className="font-bold md:text-lg">Additional Info</h3>
          <div className="flex items-center gap-2">
            <div className="mt-2 flex flex-col">
              {activity.link && (
                <ActivityDetails
                  detail="🔗 Link"
                  value={
                    <Link
                      href={activity.link}
                      className="text-blue-500 underline"
                      target="_blank"
                    >
                      Learn More
                    </Link>
                  }
                />
              )}
              <ActivityDetails
                detail="👥 Target Audience"
                value={activity.targetAudience}
              />
              <ActivityDetails
                detail="🔢 Max Attendees"
                value={activity.maxAttendees}
              />
              <ActivityDetails
                detail="Participants"
                value={activity.participants?.length}
              />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 lg:col-span-1">
          <h3 className="font-bold md:text-lg">
            Explore More {categories[0].name} Activities
          </h3>
          <div className="mt-3 flex flex-col gap-2">
            {similarActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between gap-2 rounded-lg border p-2 dark:border-gray-600"
              >
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold">{activity.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {activity.date &&
                      new Date(activity.date).toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                        weekday: "short",
                        day: "numeric",
                      })}
                  </p>
                </div>
                <Link href={`/${activity.id}`}>
                  <CiShare1 />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 lg:col-span-1">
          <h3 className="mb-3 font-bold md:text-lg">Location on map</h3>
          {mapKey && (
            <MapWrapper
              API_KEY={mapKey}
              height="h-64"
              displayActivities={false}
              selectedActivityLocation={[
                { key: activity.id, location: activity.googleLocation! },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ActivityBody;
