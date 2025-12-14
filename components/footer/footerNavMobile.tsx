"use client";

import React from "react";
import Link from "next/link";
import { useLocation } from "react-use";
import { FiMapPin } from "react-icons/fi";
import { AiOutlineAppstore, AiOutlinePlusCircle } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { BiHomeAlt2 } from "react-icons/bi";

const FooterNavMobile: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <footer className="w-full py-3 md:hidden">
      <ul className="flex items-center justify-around">
        <li className="">
          <Link href="/">
            <BiHomeAlt2
              className={`text-2xl ${pathname === "/" && "text-primary"}`}
            />
          </Link>
        </li>
        <li className="">
          <Link href="/activities">
            <AiOutlineAppstore
              className={`text-2xl ${pathname === "/activities" && "text-primary"}`}
            />
          </Link>
        </li>
        <li className="">
          <Link href="/create-activity">
            <AiOutlinePlusCircle
              className={`text-4xl ${pathname === "/create-activity" && "text-primary"}`}
            />
          </Link>
        </li>
        <li className="">
          <Link href="/discover">
            <BiSearchAlt2
              className={`text-2xl ${pathname === "/discover" && "text-primary"}`}
            />
          </Link>
        </li>
        <li className="">
          <Link href="/map">
            {" "}
            <FiMapPin
              className={`text-2xl ${pathname === "/map" && "text-primary"}`}
            />
          </Link>
        </li>
      </ul>
    </footer>
  );
};
export default FooterNavMobile;
