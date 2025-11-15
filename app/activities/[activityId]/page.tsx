import React from "react";
import Event from "@/components/event/event";
import events from "@/lib/data/events";

interface EventPageProps {
  params: Promise<{ eventId: string }>;
}

const EventPage: React.FC<EventPageProps> = async ({ params }) => {
  const { eventId } = await params;

  const activeEvent = events.find((event) => event.id === eventId);

  if (!activeEvent) {
    return (
      <div>
        <h3 className="text-center text-2xl font-bold">Event not found</h3>
      </div>
    );
  }

  return (
    <>
      <Event event={activeEvent} eventId={eventId} />
    </>
  );
};
export default EventPage;
