"use client";

import React from "react";
import Header from "@/components/header/header";
import Container from "@/components/container/container";
import EventCategoriesCarousel from "@/components/events/eventCategoriesCarousel";
import { categories } from "@/lib/data/categories";
import { useLocation } from "react-use";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  const displayCategories = pathname === "/" || pathname === "/map";

  return (
    <>
      <Header />
      {displayCategories && <EventCategoriesCarousel categories={categories} />}
      <Container>{children}</Container>
    </>
  );
};
export default MainLayout;
