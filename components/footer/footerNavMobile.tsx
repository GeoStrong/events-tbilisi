"use client";

import React from "react";
import Link from "next/link";
import { useLocation } from "react-use";
import { FiMapPin } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";

const FooterNavMobile: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <footer className="fixed bottom-0 w-full bg-white py-3 dark:bg-gray-900 md:hidden">
      <ul className="flex justify-around">
        <li className="">
          <Link href="/">
            {" "}
            <AiOutlineHome
              className={`text-2xl ${pathname === "/" && "text-primary"}`}
            />
          </Link>
        </li>
        <li className="-translate-y-1">
          <Link href="/create-activity">
            <AiOutlinePlusCircle
              className={`text-4xl ${pathname === "/create-activity" && "text-primary"}`}
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
    //           <li className="w-full">
    //             {userProfile == null && <HeaderProfileLoader />}
    //             {userProfile?.length === 0 ? (
    //               <Button
    //                 onClick={onAuthClick}
    //                 variant="ghost"
    //                 className="gap-2"
    //               >
    //                 <User className="h-5 w-5" />
    //                 <span className="md:inline">Sign In</span>
    //               </Button>
    //             ) : (
    //               <>
    //                 {userProfile && (
    //                   <HeaderProfile userName={userProfile[0].name} />
    //                 )}
    //               </>
    //             )}
    //           </li>
  );
};
export default FooterNavMobile;
