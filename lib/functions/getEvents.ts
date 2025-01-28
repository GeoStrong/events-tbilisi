import events from "../fakeData/events";
import { EventCategories } from "../types";
import { makeFirstLetterLowerCase } from "./helperFunctions";

export const getEvents = (category?: EventCategories | undefined) => {
  if (category) {
    return events.filter((event) =>
      event.categories.includes(
        makeFirstLetterLowerCase(category) as EventCategories,
      ),
    );
  }
  return events;
};
