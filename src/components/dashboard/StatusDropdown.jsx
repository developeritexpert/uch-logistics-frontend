"use client";
import { useState, useRef, useEffect } from "react";

export default function StatusDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
    
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-medium text-black focus:outline-none"
      >
        Status
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-[150px] bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="text-sm">
            {["All", "Active", "Pending", "Closed"].map((item) => (
              <li
                key={item}
                onClick={() => setOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
