import Link from "next/link";
import React from "react";
import { IoMdMegaphone } from "react-icons/io";
import HeaderNav from "./headerNav";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between rounded-b-2xl bg-white px-6 py-4 dark:bg-gray-900">
      <Link href="/" className="linear-yellow flex items-center gap-2">
        <IoMdMegaphone className="text-4xl text-primary" />
        <span className="hidden md:inline">Events-Tbilisi</span>
      </Link>
      <HeaderNav />
    </header>
  );
};
export default Header;
