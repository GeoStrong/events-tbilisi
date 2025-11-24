export type UserProfile = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar_path?: string;
  created_at: Date | string;
  additionalInfo?: string;
};
export type ActivityCategories =
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
  category: ActivityCategories;
}

export interface ParticipantValues {
  name: string;
  email: string;
  phone: string;
  additionalInfo?: string;
}

export interface ActivityEntity {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  date: Date | string | null;
  time: Date | string;
  endTime: Date | string | null;
  location: string;
  googleLocation?: google.maps.LatLngLiteral | null;
  categories?: ActivityCategories[] | string[];
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

export type NewActivityEntity = Omit<ActivityEntity, "id">;

export interface SavedActivityEntity {
  user_id: string;
  activity_id: string;
}

export type Poi = { key: string; location: google.maps.LatLngLiteral };
