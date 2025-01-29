"use client";

import React from "react";
import ThemeToggle from "../general/themeToggle";
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative my-5 h-full px-5 md:my-8 md:px-20">
      {children}
      <div className="fixed bottom-1 right-1 z-50 flex items-center justify-center rounded-full bg-white p-3 shadow-2xl duration-500 hover:bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-700">
        <ThemeToggle />
      </div>
    </div>
  );
};
export default Container;
