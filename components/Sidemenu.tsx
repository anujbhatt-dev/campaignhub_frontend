"use client";

import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

interface FiltersI{
  label: string;
  options: string[];
}


const SideMenu = ({ onFilterChange }: { onFilterChange: (query: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});
  const [filterData, setFilterData] = useState<FiltersI[] | null>(null);

  const handleFilterChange = (category: string, value: string) => {
    const updatedFilters = { ...selectedFilters, [category]: value };
    setSelectedFilters(updatedFilters);
    
    // Convert filters to query string
    const query = Object.entries(updatedFilters)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    onFilterChange(query.toLowerCase());
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}file/1/unique-values/`);
        if (res) {
          setFilterData(res.data);
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-backgroundLight w-64 h-screen border-r transition-transform ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}>
        <div className="p-5 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Filter Section */}
        <div className="p-4 space-y-4">
          {filterData && filterData.map((filter) => (
            <div key={filter.label}>
              <label className="block font-medium text-sm">{filter.label}</label>
              <select
                className="w-full mt-1 p-2 border rounded-md bg-white"
                onChange={(e) => handleFilterChange(filter.label, e.target.value)}
                value={selectedFilters[filter.label] || ""}
              >
                <option value="">Select {filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

      </div>

      {/* Hamburger Icon for Mobile */}
      <button className="fixed top-4 left-4 md:hidden z-50" onClick={() => setIsOpen(true)}>
        <Bars3Icon className="h-6 w-6 text-foreground" />
      </button>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default SideMenu;
