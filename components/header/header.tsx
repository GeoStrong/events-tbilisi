"use client";

import Link from "next/link";
import React from "react";
import { IoMdMegaphone } from "react-icons/io";
import HeaderNav from "./headerNav";
import { useLocation } from "react-use";
import useScreenSize from "@/lib/hooks/useScreenSize";
import AuthDialog from "../auth/authForm";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import HeaderProfileLoader from "./headerProfileLoader";
import { Button } from "../ui/button";
import ProfileAvatar from "../general/profileAvatar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { authActions } from "@/lib/store/authSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { authDialogOpen } = useSelector((state: RootState) => state.auth);
  const { userProfile } = useGetUserProfile();

  const { pathname } = useLocation();
  const { isMobile } = useScreenSize();

  const headerBg =
    (pathname === "/map" || pathname === "/create-activity") && isMobile
      ? "bg-transparent border-none"
      : "bg-white dark:bg-gray-900";

  const setAuthDialogOpen = async (value: boolean) => {
    dispatch(authActions.setAuthDialogOpen(value));
  };

  const openAuthDialog = () => setAuthDialogOpen(true);

  return (
    <header
      className={`sticky top-0 z-40 flex w-full items-center justify-between border-b dark:border-gray-600 md:px-20 ${headerBg} px-6 pb-2 pt-2 md:pb-0`}
    >
      <Link href="/" className="linear-yellow flex items-center gap-2">
        <IoMdMegaphone className="text-4xl text-primary" />
        <span className="linear-dark hidden md:inline">
          What&apos;sOnTbilisi
        </span>
      </Link>
      <HeaderNav userProfile={userProfile} onAuthClick={openAuthDialog} />
      <div className="md:hidden">
        {userProfile == null && <HeaderProfileLoader />}
        {userProfile?.length === 0 ? (
          <Button onClick={openAuthDialog} variant="outline" className="gap-2">
            Sign in
          </Button>
        ) : (
          userProfile && (
            <Link href="/profile">
              <ProfileAvatar image={userProfile[0]?.avatar_path} />
            </Link>
          )
        )}
      </div>

      {authDialogOpen && (
        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      )}
    </header>
  );
};
export default Header;
