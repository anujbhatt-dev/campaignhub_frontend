"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function TopBar({toggleSidemenu}:{toggleSidemenu:()=>void}) {
  
  return (
    <header className="bg-background border-b border-foreground px-6 py-4 flex items-center justify-between h-[4.5rem]">
      
      {/* Logo / Title */}
      <div onClick={toggleSidemenu} className="cursor-pointer">
          <Bars3Icon className="h-6 w-auto"/>
      </div>
      <div className="text-xl font-semibold text-foreground text-right flex-grow">Campaign Dashboard</div>

      {/* Navigation */}
      

      {/* Hamburger Icon for Mobile (optional, as there's no responsive behavior) */}
      
    </header>
  );
}
