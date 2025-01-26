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
import { EventEntity } from "@/lib/types";

interface EventCardProps {
  event: EventEntity;
  setEvent: React.Dispatch<React.SetStateAction<EventEntity | null>>;
  handleDrawer: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  setEvent,
  handleDrawer,
}) => {
  return (
    <Card
      className="cursor-pointer duration-300 hover:scale-105 dark:bg-slate-800"
      onClick={() => {
        setEvent(event);
        handleDrawer();
      }}
      key={event.id}
    >
      <CardHeader className="p-0">
        <Image
          src={event.image || ""}
          width={100}
          height={100}
          alt="event"
          className="h-full w-full rounded-t-xl object-cover"
        />
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
