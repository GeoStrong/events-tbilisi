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
    googleLocation: { lat: 41.73402627534274, lng: 44.7807786769661 },
    categories: ["festival", "music"],
    targetAudience: "everyone",
    host: "organization",
    hostName: "Event Organization",
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
    googleLocation: {
      lat: 41.73325226904308,
      lng: 44.76636594996184,
    },
    categories: ["sport", "marathon"],
    targetAudience: "athletes",
    host: "organization",
    hostName: "Sports Association",
    hostContact: {
      email: "careers@ge.in",
      phone: "1234567890",
      name: "John Doe",
    },
    image: stockImg2.src,
    tags: ["running", "sport", "marathon"],
    maxAttendees: 100,
    status: "active",
    participants: [
      {
        name: "John Doe",
        email: "",
        phone: "1234567890",
      },
    ],
    link: "https://www.google.com",
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
    googleLocation: {
      lat: 41.72374720973065,
      lng: 44.72665188644839,
    },
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
    googleLocation: {
      lat: 41.7449719048595,
      lng: 44.733720067979014,
    },
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
    googleLocation: {
      lat: 41.701736425825,
      lng: 44.79469682388956,
    },
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
    googleLocation: {
      lat: 41.66758396498732,
      lng: 44.9104498386451,
    },
    categories: ["sport", "marathon"],
    targetAudience: "athletes",
    host: "organization",
    hostName: "Sports Association",
    image: stockImg2.src,
  },
];

export default events;
