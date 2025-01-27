import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import defaultEventImg from "@/public/images/default-event-img.png";
import { EventEntity } from "@/lib/types";

interface EventCardProps {
  event: EventEntity;
  setSearchParams: (term: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, setSearchParams }) => {
  return (
    <Card
      className="cursor-pointer duration-300 hover:scale-105 dark:bg-slate-800"
      onClick={() => {
        setSearchParams(event.id.toString());
      }}
      key={event.id}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full rounded-t-xl bg-white">
          <Image
            src={event.image || defaultEventImg.src}
            width={100}
            height={100}
            alt="event"
            className={`h-full w-full rounded-t-xl ${!event.image ? "object-contain" : "object-cover"}`}
          />
        </div>
        <div className="mb-2 w-full px-2 text-right">
          <span className="rounded-full bg-primary px-2 text-xs text-white">
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>
        <CardTitle className="px-6">{event.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{event.hostName}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          {event.date.toDateString()}
        </p>
      </CardFooter>
    </Card>
  );
};
export default EventCard;
