"use client";

import React from "react";
import ThemeToggle from "../general/themeToggle";
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="my-8 h-full px-10 md:px-20">
      {children}
      <div className="fixed bottom-10 right-10 flex items-center justify-center rounded-full bg-white p-3 shadow-lg duration-500 hover:bg-gray-200 dark:bg-gray-900 hover:dark:bg-gray-700">
        <ThemeToggle />
      </div>
    </div>
  );
};
export default Container;
