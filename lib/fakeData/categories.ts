import { Category } from "../types";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import GroupsIcon from "@mui/icons-material/Groups";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import FestivalIcon from "@mui/icons-material/Festival";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ChatIcon from "@mui/icons-material/Chat";
import HikingIcon from "@mui/icons-material/Hiking";
import DataObjectIcon from "@mui/icons-material/DataObject";
import SchoolIcon from "@mui/icons-material/School";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MovieIcon from "@mui/icons-material/Movie";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AbcIcon from "@mui/icons-material/Abc";

export const categories: Category[] = [
  {
    id: 1,
    category: "music",
    name: "Music",
    icon: LibraryMusicIcon,
    color: "blue-600",
  },
  {
    id: 2,
    category: "sport",
    name: "Sport",
    icon: SportsCricketIcon,
    color: "green-600",
  },
  {
    id: 3,
    category: "theater",
    name: "Theater",
    icon: TheaterComedyIcon,
    color: "purple-600",
  },
  {
    id: 4,
    category: "marathon",
    name: "Marathon",
    icon: DirectionsRunIcon,
    color: "red-600",
  },
  {
    id: 5,
    category: "tournament",
    name: "Tournament",
    icon: VideogameAssetIcon,
    color: "yellow-600",
  },
  {
    id: 6,
    category: "conference",
    name: "Conference",
    icon: GroupsIcon,
    color: "indigo-600",
  },
  {
    id: 7,
    category: "exhibition",
    name: "Exhibition",
    icon: SlideshowIcon,
    color: "pink-600",
  },
  {
    id: 8,
    category: "festival",
    name: "Festival",
    icon: FestivalIcon,
    color: "orange-600",
  },
  {
    id: 9,
    category: "party",
    name: "Party",
    icon: CelebrationIcon,
    color: "teal-600",
  },
  {
    id: 10,
    category: "protest",
    name: "Protest",
    icon: SentimentVeryDissatisfiedIcon,
    color: "gray-600",
  },
  {
    id: 11,
    category: "discussion",
    name: "Discussion",
    icon: ChatIcon,
    color: "blue-700",
  },
  {
    id: 12,
    category: "hiking",
    name: "Hiking",
    icon: HikingIcon,
    color: "green-700",
  },
  {
    id: 13,
    category: "coding",
    name: "Coding",
    icon: DataObjectIcon,
    color: "red-700",
  },
  {
    id: 14,
    category: "seminar",
    name: "Seminar",
    icon: SchoolIcon,
    color: "purple-700",
  },
  {
    id: 15,
    category: "training",
    name: "Training",
    icon: ModelTrainingIcon,
    color: "red-700",
  },
  {
    id: 16,
    category: "concert",
    name: "Concert",
    icon: MusicNoteIcon,
    color: "yellow-700",
  },
  {
    id: 17,
    category: "movie",
    name: "Movie",
    icon: MovieIcon,
    color: "indigo-700",
  },
  {
    id: 18,
    category: "lottery",
    name: "Lottery",
    icon: LocalActivityIcon,
    color: "pink-700",
  },
  {
    id: 19,
    category: "workshop",
    name: "Workshop",
    icon: HomeRepairServiceIcon,
    color: "green-700",
  },
  {
    id: 20,
    category: "other",
    name: "Other",
    icon: AbcIcon,
    color: "gray-700",
  },
];

export const getCategoryColor = (category: string) => {
  const activeCategory = categories.find((cat) => cat.category === category);
  return `bg-${activeCategory?.color}`;
};
