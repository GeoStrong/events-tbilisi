import EventCards from "@/components/events/EventCards";
import React from "react";

const App: React.FC = () => {
  return (
    <>
      <h1 className="linear-dark mb-10 text-4xl font-bold">Recent Events</h1>
      <EventCards />;
    </>
  );
};

export default App;
