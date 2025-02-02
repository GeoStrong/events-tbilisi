"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ImUsers } from "react-icons/im";
import {
  BsPlusCircle,
  BsFillCalendar2EventFill,
  BsFillMapFill,
} from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import Link from "next/link";
import { useLocation } from "react-use";
import useScreenSize from "@/lib/hooks/useScreenSize";

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { isMobile } = useScreenSize();

  const menuColor =
    location.pathname === "/Map" && isMobile
      ? "text-black"
      : "text-gray-900 dark:text-slate-200";

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <BiMenuAltRight className={`cursor-pointer text-4xl ${menuColor}`} />
      </SheetTrigger>
      <SheetContent className="w-full dark:bg-gray-900">
        <SheetHeader className="h-full text-left">
          <SheetTitle className="mt-5 text-2xl">Events-Tbilisi</SheetTitle>
          <div className="flex h-full flex-col items-end justify-between text-xl text-slate-800 dark:text-white">
            <ul className="mt-10 flex h-1/3 w-full flex-col gap-5">
              <li className="flex w-full items-center justify-between rounded-lg border border-slate-300 px-4 py-2 dark:border-gray-600">
                <Link className="text-lg" href="/">
                  Events
                </Link>
                <BsFillCalendar2EventFill className="text-purple-900" />
              </li>
              <li className="flex w-full items-center justify-between rounded-lg border border-slate-300 px-4 py-2 dark:border-gray-600">
                <Link className="text-lg" href="/Map">
                  Map of Events
                </Link>
                <BsFillMapFill className="text-green-800" />
              </li>
              <li className="flex w-full items-center justify-between rounded-lg border border-slate-300 px-4 py-2 dark:border-gray-600">
                <Link className="text-lg" href="/Create-event">
                  Create Event
                </Link>
                <BsPlusCircle className="text-amber-600" />
              </li>
              <li className="flex w-full items-center justify-between rounded-lg border border-slate-300 px-4 py-2 dark:border-gray-600">
                <Link className="text-lg" href="/About">
                  About Us
                </Link>
                <ImUsers />
              </li>
            </ul>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default MobileMenu;
