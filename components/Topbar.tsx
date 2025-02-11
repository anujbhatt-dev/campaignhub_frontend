"use client";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function TopBar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="bg-background border-b border-foreground px-6 py-4 flex items-center justify-between h-[4.5rem]">
      {/* Logo / Title */}
      <div className="text-xl font-semibold text-foreground">Campaign Dashboard</div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6">
        <a href="#" className="text-foreground hover:underline">
          Dashboard
        </a>
        <a href="#" className="text-foreground hover:underline">
          Reports
        </a>
        <a href="#" className="text-foreground hover:underline">
          Settings
        </a>
      </nav>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg border border-foreground text-foreground hover:bg-foreground/10"
      >
        {theme === "light" ? (
          <MoonIcon className="w-6 h-6" />
        ) : (
          <SunIcon className="w-6 h-6" />
        )}
      </button>
    </header>
  );
}
