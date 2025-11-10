"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useScreenSize from "@/lib/hooks/useScreenSize";
import MobileMenu from "./mobile-menu";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import HeaderProfile from "./headerProfile";
import HeaderProfileLoader from "./headerProfileLoader";
import { TbMapPinFilled } from "react-icons/tb";
import { BsFillCalendar2EventFill, BsPlusCircle } from "react-icons/bs";

interface HeaderNavProps {
  onAuthClick: () => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ onAuthClick }) => {
  const pathname = usePathname();
  const { isXsm } = useScreenSize();
  const { userProfile } = useGetUserProfile();

  return (
    <>
      {isXsm ? (
        <MobileMenu onAuthClick={onAuthClick} />
      ) : (
        <nav className="flex items-center gap-3">
          <ul className="flex items-center gap-6">
            <li
              className={`flex flex-col items-center gap-1 px-3 hover:text-primary ${pathname === "/" && "border-b-2 border-primary text-primary"}`}
            >
              <BsFillCalendar2EventFill className="" />
              <Link href="/" className="text-sm">
                Events
              </Link>
            </li>
            <li
              className={`flex flex-col items-center gap-1 px-3 hover:text-primary ${pathname === "/map" && "border-b-2 border-primary text-primary"}`}
            >
              <TbMapPinFilled className="text-xl" />
              <Link href="/map" className="text-sm">
                Map
              </Link>
            </li>
            <li
              className={`flex flex-col items-center gap-1 px-3 hover:text-primary ${pathname === "/create-event" && "border-b-2 border-primary text-primary"}`}
            >
              <BsPlusCircle className="" />
              <Link href="/create-event" className="text-sm">
                Create Event
              </Link>
            </li>
            <li className={`hover:text-primary`}>
              {userProfile == null && <HeaderProfileLoader />}
              {userProfile?.length === 0 ? (
                <Button onClick={onAuthClick} variant="ghost" className="gap-2">
                  <User className="h-5 w-5" />
                  <span className="md:inline">Sign In</span>
                </Button>
              ) : (
                <>
                  {userProfile && (
                    <HeaderProfile userName={userProfile[0].name} />
                  )}
                </>
              )}
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default HeaderNav;
