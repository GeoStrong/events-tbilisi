"use client";

import React from "react";
import Header from "@/components/header/header";
import Container from "@/components/container/container";
import EventCategoriesCarousel from "@/components/events/eventCategoriesCarousel";
import { categories } from "@/lib/data/categories";
import { useLocation } from "react-use";
import SearchSection from "./searchSection";
import { Toaster } from "../ui/sonner";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  const displayCategories = pathname === "/" || pathname === "/map";
  const displaySearchSection = pathname === "/";

  return (
    <>
      <Toaster position="top-right" richColors />
      <Header />
      {displayCategories && <EventCategoriesCarousel categories={categories} />}
      {displaySearchSection && <SearchSection />}
      <Container>{children}</Container>
    </>
  );
};
export default MainLayout;
