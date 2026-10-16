import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../../context/ThemeContext"


interface DarkModeButtonProps {
  className?: string;
}

export default function DarkModeButton({ className = "" }: DarkModeButtonProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`mr-1 grid h-7 w-7 place-items-center rounded-md text-[#4368a6] transition-colors hover:bg-[#eef6ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2458ae] dark:text-blue-300 dark:hover:bg-slate-800 ${className}`}
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}
