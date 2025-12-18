"use client";

import React from "react";
import Header from "@/components/header/header";
import Container from "@/components/container/container";
import SmartActivityCategoriesCarousel from "@/components/activities/smartActivityCategoriesCarousel";
import { useLocation } from "react-use";
import SearchSection from "./searchSection";
import { Toaster } from "../ui/sonner";
import SignupSuccessDialog from "@/components/auth/signupSuccessDialog";
import VerificationDialogWrapper from "../auth/verificationDialog";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  const displayCategories = pathname === "/activities" || pathname === "/map";
  const displaySearchSection = pathname === "/activities";

  return (
    <>
      <Toaster position="top-right" richColors />
      <VerificationDialogWrapper />
      <SignupSuccessDialog />
      <Header />
      {displayCategories && <SmartActivityCategoriesCarousel />}
      {displaySearchSection && <SearchSection />}
      <Container>{children}</Container>
    </>
  );
};
export default MainLayout;
