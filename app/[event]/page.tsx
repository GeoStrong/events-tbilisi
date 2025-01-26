import React from "react";

interface EventPageProps {
  params: Promise<{ event: string }>;
}

const EventPage: React.FC<EventPageProps> = async ({ params }) => {
  const { event } = await params;
  console.log(event);

  return <>Hello World</>;
};
export default EventPage;
