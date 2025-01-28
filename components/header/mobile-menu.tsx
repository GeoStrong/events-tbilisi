"use client";

import React from "react";
import { BiMenuAltRight } from "react-icons/bi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ImUsers } from "react-icons/im";
import { BsFillCalendar2EventFill, BsFillMapFill } from "react-icons/bs";
import Link from "next/link";

const MobileMenu: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <BiMenuAltRight className="cursor-pointer text-4xl text-gray-900 dark:text-slate-200" />
      </SheetTrigger>
      <SheetContent className="w-full dark:bg-gray-900">
        <SheetHeader className="h-full text-left">
          <SheetTitle className="mt-5">
            <h3 className="text-2xl">Events-Tbilisi</h3>
          </SheetTitle>
          <SheetDescription className="flex h-full flex-col items-end justify-between text-xl text-slate-800 dark:text-white">
            <ul className="mt-10 flex h-1/3 w-full flex-col gap-5">
              <li className="flex w-full items-center justify-between rounded-lg border border-slate-300 px-4 py-2 dark:border-gray-600">
                <Link className="text-lg" href="/">
                  Events
                </Link>
                <BsFillCalendar2EventFill className="text-purple-900" />
              </li>
              <li className="flex w-full items-center justify-between rounded-lg border border-slate-300 px-4 py-2 dark:border-gray-600">
                <Link className="text-lg" href="/Map">
                  Map
                </Link>
                <BsFillMapFill className="text-green-800" />
              </li>
              <li className="flex w-full items-center justify-between rounded-lg border border-slate-300 px-4 py-2 dark:border-gray-600">
                <Link className="text-lg" href="/About">
                  About Us
                </Link>
                <ImUsers />
              </li>
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default MobileMenu;
