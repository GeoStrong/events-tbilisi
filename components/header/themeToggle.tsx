import { MdModeNight } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import React from "react";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const onThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button className="text-3xl" onClick={onThemeToggle}>
      {theme === "dark" ? <MdLightMode /> : <MdModeNight />}
    </button>
  );
};
export default ThemeToggle;
