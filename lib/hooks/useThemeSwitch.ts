import { useTheme } from "next-themes";

const useThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const onThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return { theme, onThemeToggle };
};
export default useThemeSwitch;
