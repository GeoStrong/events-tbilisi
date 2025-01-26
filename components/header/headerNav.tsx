"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useScreenSize from "@/lib/hooks/useScreenSize";
import MobileMenu from "./mobile-menu";
const HeaderNav: React.FC = () => {
  const pathname = usePathname();
  const { isXsm } = useScreenSize();

  return (
    <>
      {isXsm ? (
        <MobileMenu />
      ) : (
        <nav className="flex items-center gap-3">
          <ul className="flex gap-6">
            <li
              className={`hover:text-primary ${pathname === "/" && "text-primary"}`}
            >
              <Link href="/" className="">
                Events
              </Link>
            </li>
            <li
              className={`hover:text-primary ${pathname === "/Map" && "text-primary"}`}
            >
              <Link href="/Map">Map</Link>
            </li>
            <li
              className={`hover:text-primary ${pathname === "/About" && "text-primary"}`}
            >
              <Link href="/About">About Us</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default HeaderNav;
