"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline"; // HeroIcon for clear button

interface FiltersI {
  label: string;
  options: string[];
}

const SideMenu = ({ onFilterChange, selectedFileId, isOpen }: { onFilterChange: (query: string) => void, selectedFileId?: number, isOpen: boolean }) => {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});
  const [filterData, setFilterData] = useState<FiltersI[] | null>(null);

  const handleFilterChange = (category: string, value: string) => {
    const updatedFilters = { ...selectedFilters, [category]: value };
    setSelectedFilters(updatedFilters);

    // Save updated filters to localStorage
    localStorage.setItem("selectedFilters", JSON.stringify(updatedFilters));

    // Convert filters to query string
    const query = Object.entries(updatedFilters)
      .map(([key, val]) => `${key.toLowerCase()}=${val}`)
      .join("&");

    onFilterChange(query);
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    localStorage.removeItem("selectedFilters");
    onFilterChange(""); // Clear the query
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}file/${selectedFileId}/unique-values/`);
        if (res) {
          setFilterData(res.data);
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    if (selectedFileId) fetchFilters();
  }, [selectedFileId]);

  useEffect(() => {
    // Load filters from localStorage when the component mounts
    const storedFilters = localStorage.getItem("selectedFilters");
    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      setSelectedFilters(parsedFilters);

      // Call onFilterChange with the loaded filters to update the table
      const query = Object.entries(parsedFilters)
        .map(([key, val]) => `${key.toLowerCase()}=${val}`)
        .join("&");

      onFilterChange(query);
    }
  }, [onFilterChange]);

  return (
    isOpen &&
    <div className="flex sticky top-0 left-0 border-r border-black">
      <div className="bg-backgroundLight w-64 h-screen border-r">
        <div className="p-5 flex justify-between items-center h-[4.5rem] border-b border-black">
          <h2 className="text-lg font-semibold">Filters</h2>
          {/* Conditionally render the Clear button if there are selected filters */}
          {Object.keys(selectedFilters).length > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-white  p-2 flex gap-x-1 items-center justify-between text-[0.8rem] bg-zinc-600 hover:bg-zinc-900 transition-all duration-75 rounded "
              title="Clear Filters"
            >
              Clear all filter <XMarkIcon className="h-3 w-3" />
            </button>
          )}
        </div>

        {selectedFileId && (
          <div className="m-2 space-y-4">
            {filterData &&
              filterData.map((filter) => (
                <motion.div
                  key={filter.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="p-2 bg-zinc-200 rounded-lg shadow-sm"
                >
                  <label className="block text-sm uppercase ml-2 font-bold">{filter.label}</label>
                  <select
                    className="w-full mt-1 p-2 rounded-md bg-zinc-100 shadow-md text-[0.8rem]"
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
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
