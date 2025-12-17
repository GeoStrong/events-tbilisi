"use client";

import Link from "next/link";
import React from "react";
import { IoMdMegaphone } from "react-icons/io";
import HeaderNav from "./headerNav";
import { useLocation } from "react-use";
import useScreenSize from "@/lib/hooks/useScreenSize";
import AuthDialog from "../auth/authForm";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { authActions } from "@/lib/store/authSlice";
import HeaderProfile from "./headerProfile";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { authDialogOpen } = useSelector((state: RootState) => state.auth);
  const { user, isLoading, isAuthenticated } = useGetUserProfile();

  const { pathname } = useLocation();
  const { isMobile } = useScreenSize();

  const headerBg =
    pathname === "/map" && isMobile
      ? "bg-transparent border-none"
      : "bg-white dark:bg-gray-900";

  const setAuthDialogOpen = (value: boolean) => {
    dispatch(authActions.setAuthDialogOpen(value));
  };

  const openAuthDialog = () => {
    setAuthDialogOpen(true);
  };

  return (
    <header
      className={`sticky top-0 z-40 flex w-full items-center justify-between border-b bg-white backdrop-blur-md dark:border-slate-700 dark:bg-slate-900 md:px-20 ${headerBg ? "border-none bg-transparent backdrop-blur-none" : ""} px-6 pb-2 pt-2 transition-colors md:pb-0`}
    >
      <Link
        href="/"
        className="linear-yellow flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="What'sOnTbilisi Home"
      >
        <IoMdMegaphone className="text-4xl text-primary" />
        <span className="gradient-primary hidden bg-clip-text text-2xl font-bold text-transparent lg:inline">
          What&apos;sOnTbilisi
        </span>
      </Link>
      <HeaderNav
        user={user}
        isLoading={isLoading}
        isAuthenticated={isAuthenticated}
        onAuthClick={openAuthDialog}
      />
      <div className="md:hidden">
        {isLoading ? (
          <div className="h-10 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        ) : !isAuthenticated || !user ? (
          <Button onClick={openAuthDialog} variant="outline" className="gap-2">
            Sign in
          </Button>
        ) : (
          <HeaderProfile user={user} />
        )}
      </div>

      {authDialogOpen && (
        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      )}
    </header>
  );
};
export default Header;
