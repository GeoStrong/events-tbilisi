import { EventEntity } from "../types";
import stockImg1 from "@/public/images/R.jpeg";
import stockImg2 from "@/public/images/R (1).jpeg";

const events: EventEntity[] = [
  {
    id: 1,
    title: "Music Festival",
    description:
      "A music festival is a community event oriented towards live performances of singing and instrument playing that is often presented with a theme such as musical genre",
    date: new Date("2022-12-31"),
    startDate: new Date("2022-12-31"),
    endDate: new Date("2023-01-01"),
    time: "12:00",
    location: "Tbilisi, Georgia",
    categories: ["festival", "music"],
    targetAudience: "everyone",
    host: "organization",
    hostName: "Event Organization",
    // image: stockImg1.src,
  },
  {
    id: 2,
    title: "Marathon",
    description:
      "A marathon is a long-distance race, completed by running, walking, or a run/walk strategy. There are also wheelchair divisions.",
    date: new Date("2023-03-15"),
    startDate: new Date("2022-12-31"),
    endDate: new Date("2023-01-01"),
    time: "08:00",
    location: "Tbilisi, Georgia",
    categories: ["sport", "marathon"],
    targetAudience: "athletes",
    host: "organization",
    hostName: "Sports Association",
    image: stockImg2.src,
  },
  {
    id: 3,
    title: "Music Festival",
    description:
      "A music festival is a community event oriented towards live performances of singing and instrument playing that is often presented with a theme such as musical genre",
    date: new Date("2022-12-31"),
    startDate: new Date("2022-12-31"),
    endDate: new Date("2023-01-01"),
    time: "12:00",
    location: "Tbilisi, Georgia",
    categories: ["festival", "music"],
    targetAudience: "everyone",
    host: "organization",
    hostName: "Event Organization",
    image: stockImg1.src,
  },
  {
    id: 4,
    title: "Marathon",
    description:
      "A marathon is a long-distance race, completed by running, walking, or a run/walk strategy. There are also wheelchair divisions.",
    date: new Date("2023-03-15"),
    startDate: new Date("2022-12-31"),
    endDate: new Date("2023-01-01"),
    time: "08:00",
    location: "Tbilisi, Georgia",
    categories: ["sport", "marathon"],
    targetAudience: "athletes",
    host: "organization",
    hostName: "Sports Association",
    image: stockImg2.src,
  },
  {
    id: 5,
    title: "Music Festival",
    description:
      "A music festival is a community event oriented towards live performances of singing and instrument playing that is often presented with a theme such as musical genre",
    date: new Date("2022-12-31"),
    startDate: new Date("2022-12-31"),
    endDate: new Date("2023-01-01"),
    time: "12:00",
    location: "Tbilisi, Georgia",
    categories: ["festival", "music"],
    targetAudience: "everyone",
    host: "organization",
    hostName: "Event Organization",
    image: stockImg1.src,
  },
  {
    id: 6,
    title: "Marathon",
    description:
      "A marathon is a long-distance race, completed by running, walking, or a run/walk strategy. There are also wheelchair divisions.",
    date: new Date("2023-03-15"),
    startDate: new Date("2022-12-31"),
    endDate: new Date("2023-01-01"),
    time: "08:00",
    location: "Tbilisi, Georgia",
    categories: ["sport", "marathon"],
    targetAudience: "athletes",
    host: "organization",
    hostName: "Sports Association",
    image: stockImg2.src,
  },
];

export default events;
