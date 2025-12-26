"use client";

import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({
  label,
  options = [],
  defaultValue = "",
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  error,
  className = "",
  isStatusSelect = false, // ✅ ONLY status dropdown uses color logic
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || value || ""
  );

  const dropdownRef = useRef(null);

  // Sync controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedValue(option);
    onChange?.(option);
    setIsOpen(false);
  };

  const displayValue = selectedValue || placeholder;

  // ✅ Text color logic (scoped)
  const getTextColor = () => {
    if (!isStatusSelect) return "text-[#747474]"; // normal dropdowns

    if (selectedValue === "Inactive") return "text-[#D92D20]"; // 🔴 red
    return "text-[#009249]"; // 🟢 green (Active + placeholder)
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block text-[16px] font-bold mb-1">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full
          flex items-center justify-between
          px-[20px]
          py-[10px] 2xl:py-[20px]
          text-left
          bg-white
          border
          rounded-[5px]
          focus:outline-none
          focus:border-[#515151]
          ${
            disabled
              ? "bg-gray-50 cursor-not-allowed text-gray-400"
              : ""
          }
          ${error ? "border-red-500" : "border-[#22358114]"}
        `}
      >
        {/* Selected / Placeholder */}
        <span className={`truncate ${getTextColor()}`}>
          {displayValue}
        </span>

        {/* Arrow */}
        <svg
          className={`w-[10px] h-[10px] text-[#515151] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 16 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.900391 0.900023L7.90039 7.90002L14.9004 0.900025"
            stroke="#515151"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Error */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#22358114] rounded-[5px] shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {options.length ? (
              options.map((option, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full
                      flex items-center justify-between
                      px-4 py-2
                      text-left
                      text-sm
                      hover:bg-gray-50
                      transition-colors
                      ${
                        selectedValue === option
                          ? "bg-primary/5 text-primary"
                          : "text-[#747474]"
                      }
                    `}
                  >
                    <span className="truncate">{option}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-center text-gray-500">
                No options available
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;