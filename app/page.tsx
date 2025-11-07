import EventCardsWrapper from "@/components/events/eventCardsWrapper";
import EventCategories from "@/components/events/eventCategoriesCarousel";

import { getCategories } from "@/lib/supabase/supabaseClient";

import React from "react";

const App: React.FC = async () => {
  const categories = await getCategories();

  return (
    <>
      <h1 className="mb-5 text-2xl font-bold md:mb-10">Events in Tbilisi</h1>

      {categories ? (
        <EventCategories categories={categories} />
      ) : (
        <div>Loading categories...</div>
      )}
      <EventCardsWrapper />
    </>
  );
};

export default App;
