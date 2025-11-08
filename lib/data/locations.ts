import { Poi } from "../types";
import events from "./events";

export const locations: Poi[] = events
  .filter((event) => event.googleLocation !== undefined)
  .map((event) => {
    return {
      key: `event-${event.id}`,
      location: event.googleLocation!,
    };
  });
