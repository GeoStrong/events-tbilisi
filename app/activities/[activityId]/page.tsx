import React from "react";
import Event from "@/components/event/event";
import { getEvents } from "@/lib/functions/supabaseFunctions";
import { EventEntity } from "@/lib/types";

interface EventPageProps {
  params: Promise<{ activityId: string }>;
}

const EventPage: React.FC<EventPageProps> = async ({ params }) => {
  const { activityId } = await params;

  const events = (await getEvents()) as EventEntity[];

  const activeEvent = events.find((event) => event.id === activityId);

  if (!activeEvent) {
    return (
      <div>
        <h3 className="text-center text-2xl font-bold">Event not found</h3>
      </div>
    );
  }

  return (
    <>
      <Event event={activeEvent} eventId={activityId} />
    </>
  );
};
export default EventPage;
