import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type EventCategories =
  | "music"
  | "sport"
  | "theater"
  | "marathon"
  | "contest"
  | "conference"
  | "exhibition"
  | "festival"
  | "party"
  | "protest"
  | "discussion"
  | "workshop"
  | "seminar"
  | "training"
  | "concert"
  | "movie"
  | "lottery"
  | "other";

export interface Category {
  id: number | string;
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
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
  id: string | number;
  title: string;
  description: string;
  date: Date;
  startDate: Date;
  endDate: Date | "ongoing";
  time: Date | string;
  location: string;
  type: EventCategories;
  targetAudience?: string;
  host?: "organization" | "individual";
  hostName?: string;
  hostContact?: {
    email?: string;
    phone?: string;
    name: string;
  };
  link?: string;
  image?: string;
  maxAttendees?: number;
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
