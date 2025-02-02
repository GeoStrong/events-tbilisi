"use client";

import Link from "next/link";
import React from "react";
import { IoMdMegaphone } from "react-icons/io";
import HeaderNav from "./headerNav";
import { useLocation } from "react-use";
import useScreenSize from "@/lib/hooks/useScreenSize";

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { isMobile } = useScreenSize();

  const headerBg =
    (pathname === "/Map" || pathname === "/Create-event") && isMobile
      ? "bg-transparent"
      : "bg-white dark:bg-gray-900";

  return (
    <header
      className={`sticky top-0 z-40 flex w-full items-center justify-between rounded-b-2xl ${headerBg} px-6 py-4`}
    >
      <Link href="/" className="linear-yellow flex items-center gap-2">
        <IoMdMegaphone className="text-4xl text-primary" />
        <span className="hidden md:inline">Events-Tbilisi</span>
      </Link>
      <HeaderNav />
    </header>
  );
};
export default Header;
