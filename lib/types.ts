export type UserProfile = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar_path?: string;
  created_at: Date;
  additionalInfo?: string;
};
export type EventCategories =
  | "music"
  | "sport"
  | "theater"
  | "marathon"
  | "tournament"
  | "conference"
  | "exhibition"
  | "festival"
  | "party"
  | "protest"
  | "discussion"
  | "hiking"
  | "coding"
  | "seminar"
  | "training"
  | "concert"
  | "movie"
  | "lottery"
  | "workshop"
  | "other";

export type ImageType = string | File | null;

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: EventCategories;
}

export interface ParticipantValues {
  name: string;
  email: string;
  phone: string;
  additionalInfo?: string;
}

export interface EventEntity {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  date: Date | null;
  time: Date | string;
  endTime: Date | string | null;
  location: string;
  googleLocation?: google.maps.LatLngLiteral;
  categories?: EventCategories[];
  targetAudience?: string | null;
  host?: "organization" | "individual";
  entryFee?: boolean;
  hostName?: string;
  hostContact?: {
    email?: string;
    phone?: string;
    name: string;
    image?: string;
  };
  image: ImageType;
  link?: string | null;
  maxAttendees?: number | null;
  tags?: string[];
  maxTags?: 10;
  comments?: string[];
  rating?: number;
  reviews?: string[];
  status?: "active" | "inactive" | "pending";
  createdAt?: Date;
  updatedAt?: Date;
  participants?: ParticipantValues[];
}

export type NewEventEntity = Omit<EventEntity, "id">;

export interface SavedEventEntity {
  user_id: string;
  event_id: string;
}

export type Poi = { key: string; location: google.maps.LatLngLiteral };
