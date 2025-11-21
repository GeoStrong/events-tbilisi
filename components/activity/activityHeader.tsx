import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import Share from "../general/share";
import { Category, ActivityEntity } from "@/lib/types";
import defaultActivityImg from "@/public/images/default-activity-img.png";
import { getActivityImageUrl } from "@/lib/functions/supabaseFunctions";
import BookmarkButton from "../general/bookmarkButton";
import ActivityHeaderButtons from "./activityHeaderButtons";

const ActivityHeader: React.FC<{
  activity: ActivityEntity;
  categories: Category[];
}> = async ({ activity, categories }) => {
  const imageUrl = (await getActivityImageUrl(activity.image)) as string;

  const activityWithImage = {
    ...activity,
    image: imageUrl,
  };

  return (
    <>
      <header className="sticky top-20 z-40 mt-5 flex items-center justify-start gap-5 rounded-xl bg-white px-2 py-4 shadow-md dark:bg-gray-900 md:static md:px-6">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 md:hidden"
          >
            <IoMdArrowRoundBack />
          </Link>
          <Image
            src={imageUrl || defaultActivityImg.src}
            alt="activity"
            width={100}
            height={100}
            className="hidden max-h-24 w-64 rounded-md bg-white object-cover md:block"
            unoptimized
          />
        </div>
        <div className="flex w-full items-center justify-between gap-3 md:flex-col md:items-start md:justify-start">
          <h2 className="text-xl font-bold md:text-3xl">{activity.title}</h2>
          <div className="flex gap-3">
            <BookmarkButton activityId={activity.id} />
            <Share activity={activity}>
              <FiShare className="text-lg md:text-2xl" />
            </Share>
          </div>
        </div>
        <ActivityHeaderButtons
          activity={activityWithImage}
          categories={categories}
        />
      </header>
    </>
  );
};
export default ActivityHeader;
