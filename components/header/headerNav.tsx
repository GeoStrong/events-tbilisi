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
import Spinner from "../general/spinner";

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
        <MobileMenu />
      ) : (
        <nav className="flex items-center gap-3">
          <ul className="flex items-center gap-6">
            <li
              className={`hover:text-primary ${pathname === "/" && "text-primary"}`}
            >
              <Link href="/" className="">
                Events
              </Link>
            </li>
            <li
              className={`hover:text-primary ${pathname === "/map" && "text-primary"}`}
            >
              <Link href="/map">Map</Link>
            </li>
            <li
              className={`hover:text-primary ${pathname === "/create-event" && "text-primary"}`}
            >
              <Link href="/create-event" className="">
                Create Event
              </Link>
            </li>
            <li className={`hover:text-primary`}>
              {userProfile == null && <Spinner />}
              {userProfile?.length === 0 ? (
                <Button onClick={onAuthClick} variant="ghost" className="gap-2">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">Sign In</span>
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
