import { getEvents } from "../functions/supabaseFunctions";
import { EventEntity, Poi } from "../types";

const events = (await getEvents()) as EventEntity[];

export const locations: Poi[] = events
  .filter((event) => event.googleLocation !== undefined)
  .map((event) => {
    return {
      key: `activity-${event.id}`,
      location: event.googleLocation!,
    };
  });
