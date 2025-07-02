import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/library/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "rounded-full transition-colors duration-300 cursor-pointer",
      )}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-foreground/80 hover:text-primary transition-colors duration-300" />
      ) : (
        <Moon className="h-6 w-6 text-foreground/80 hover:text-primary transition-colors duration-300" />
      )}
    </button>
  );
};