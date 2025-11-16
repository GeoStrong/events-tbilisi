"use client";

import React from "react";
import Link from "next/link";
import { LayoutGroup, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import HeaderProfile from "./headerProfile";
import HeaderProfileLoader from "./headerProfileLoader";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { UserProfile } from "@/lib/types";

interface HeaderNavProps {
  onAuthClick: () => void;
  userProfile: UserProfile[] | null;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ onAuthClick, userProfile }) => {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden items-center gap-3 md:flex">
        <LayoutGroup>
          <ul className="flex items-center gap-6">
            <li
              className={`relative hover:text-primary ${pathname === "/" && "border-primary text-primary"}`}
            >
              <Link
                href="/"
                className="mb-1 flex flex-col items-center gap-1 px-3 text-sm"
              >
                <AiOutlineHome className="text-base" />
                Activities
              </Link>
              {pathname === "/" && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 h-[2px] w-full bg-primary"
                />
              )}
            </li>
            <li
              className={`relative flex flex-col items-center gap-1 hover:text-primary ${pathname === "/map" && "border-primary text-primary"}`}
            >
              <Link
                href="/map"
                className="mb-1 flex flex-col items-center gap-1 px-3 text-sm"
              >
                <FiMapPin className="text-base" />
                Map
              </Link>
              {pathname === "/map" && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 h-[2px] w-full bg-primary"
                />
              )}
            </li>
            <li
              className={`relative flex flex-col items-center gap-1 hover:text-primary ${pathname === "/create-activity" && "border-primary text-primary"}`}
            >
              <Link
                href="/create-activity"
                className="mb-1 flex flex-col items-center gap-1 px-3 text-sm"
              >
                <AiOutlinePlusCircle className="text-base" />
                Create Activity
              </Link>
              {pathname === "/create-activity" && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 h-[2px] w-full bg-primary"
                />
              )}
            </li>
            <li className={`hover:text-primary`}>
              {userProfile === null && <HeaderProfileLoader />}
              {userProfile?.length === 0 ||
              (userProfile && userProfile[0] === null) ? (
                <Button onClick={onAuthClick} variant="ghost" className="gap-2">
                  <User className="h-5 w-5" />
                  <span className="md:inline">Sign In</span>
                </Button>
              ) : (
                <>{userProfile && <HeaderProfile user={userProfile[0]} />}</>
              )}
            </li>
          </ul>
        </LayoutGroup>
      </nav>
    </>
  );
};
export default HeaderNav;
