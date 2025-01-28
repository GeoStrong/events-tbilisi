import EventCardsWrapper from "@/components/events/eventCardsWrapper";
import EventCategories from "@/components/events/eventCategories";
import React from "react";

const App: React.FC = () => {
  return (
    <>
      <h1 className="mb-5 text-2xl font-bold -tracking-widest md:mb-10">
        Events in Tbilisi
      </h1>
      <EventCategories />
      <EventCardsWrapper />
    </>
  );
};

export default App;
