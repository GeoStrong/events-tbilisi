"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EventEntity } from "@/lib/types";
import Image from "next/image";
import defaultEventImg from "@/public/images/default-event-img.png";
import Socials from "./socials";
import { useLocation } from "react-use";
import { Button } from "../ui/button";

const Share: React.FC<{ children: React.ReactNode; event: EventEntity }> = ({
  children,
  event,
}) => {
  const image = event.image || defaultEventImg.src;
  const { href } = useLocation();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(href || "");
    setTimeout(() => {
      setCopied(true);
    }, 1000);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share with your friends</DialogTitle>
            <DialogDescription>
              There are number of ways to share the Event with other people.
            </DialogDescription>
            <div className="flex items-center gap-3 rounded-md border shadow-lg">
              <div className="bg-white">
                <Image src={image} alt="event" width={100} height={100} />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {event.date.toDateString()}
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
