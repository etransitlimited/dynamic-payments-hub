
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button 
        onClick={toggleTheme}
        className={cn(
          "relative flex h-9 w-16 rounded-full transition-colors duration-300 focus:outline-none",
          isDark 
            ? "bg-blue-900/90 border border-blue-700/50" 
            : "bg-white/90 border border-gray-300"
        )}
        aria-label="Toggle theme"
      >
        <span className="sr-only">Toggle theme</span>
        <div 
          className={cn(
            "absolute top-1 h-7 w-7 rounded-full transform transition-transform duration-300 shadow-sm flex items-center justify-center",
            isDark 
              ? "translate-x-8 bg-white text-blue-900" 
              : "translate-x-1 bg-white text-amber-500 border border-gray-200"
          )}
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </div>
      </button>
    </div>
  );
};

export default ThemeSwitch;
