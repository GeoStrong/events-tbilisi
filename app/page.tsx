import EventCardsWrapper from "@/components/events/eventCards";
import EventCategories from "@/components/events/eventCategories";
import React from "react";

const App: React.FC = () => {
  return (
    <>
      <h1 className="linear-dark mb-10 text-4xl font-bold">
        Events in Tbilisi
      </h1>
      <EventCategories />
      <EventCardsWrapper />
    </>
  );
};

export default App;
