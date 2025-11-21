"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ActivityEntity } from "@/lib/types";
import Image from "next/image";
import defaultActivityImg from "@/public/images/default-activity-img.png";
import Socials from "./socials";
import { useLocation } from "react-use";
import { Button } from "../ui/button";
import { getActivityImageUrl } from "@/lib/functions/supabaseFunctions";

const Share: React.FC<{
  children: React.ReactNode;
  activity: ActivityEntity;
}> = ({ children, activity }) => {
  const [activityImage, setActivityImage] = useState<string>();
  const { href } = useLocation();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(href || "");
    setTimeout(() => {
      setCopied(true);
    }, 1000);
  };

  useEffect(() => {
    (async () => {
      const imageUrl = await getActivityImageUrl(activity.image);

      setActivityImage(imageUrl!);
    })();
  }, [activity.image]);

  return (
    <>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share with your friends</DialogTitle>
            <DialogDescription>
              There are number of ways to share the Activity with other people.
            </DialogDescription>
            <div className="flex items-center gap-3 rounded-md border shadow-lg">
              <div className="bg-white">
                <Image
                  src={activityImage || defaultActivityImg.src}
                  alt="activity"
                  width={100}
                  height={100}
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <h3 className="">{activity.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Socials />
            </div>
            <p className="!mt-5">
              Or simply copy the link and share it with your friends.
            </p>
            <div className="flex items-center">
              <input
                type="text"
                value={href}
                className="h-10 rounded-md rounded-r-none border bg-gray-200 p-2 dark:bg-gray-800"
                readOnly
                disabled
              />
              <Button
                onClick={copyToClipboard}
                className="h-10 rounded-none px-5 text-white"
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Share;
