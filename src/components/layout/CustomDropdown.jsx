import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ driverId, driverName, onView, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        if (!isOpen && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            
            // Calculate position for the dropdown
            setDropdownPosition({
                top: buttonRect.bottom + window.scrollY,
                left: buttonRect.right - 192, // 192px is approximately dropdown width (48 * 4)
            });
        }
        setIsOpen(!isOpen);
    };

    const handleView = () => {
        onView(driverId, driverName);
        setIsOpen(false);
    };

    const handleEdit = () => {
        onEdit(driverId, driverName);
        setIsOpen(false);
    };

    const handleDelete = () => {
        onDelete(driverId, driverName);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close dropdown on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsOpen(false);
        };

        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, []);

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="p-1 focus:outline-0 cursor-pointer"
                aria-label="Actions"
            >
                <svg
                    width="33"
                    height="8"
                    viewBox="0 0 33 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="29.3337"
                        cy="3.66667"
                        r="3.66667"
                        transform="rotate(90 29.3337 3.66667)"
                        fill="#223581"
                        fillOpacity={isOpen ? "1" : "0.08"}
                    />
                    <circle
                        cx="16.5007"
                        cy="3.66667"
                        r="3.66667"
                        transform="rotate(90 16.5007 3.66667)"
                        fill="#223581"
                        fillOpacity={isOpen ? "1" : "0.08"}
                    />
                    <circle
                        cx="3.66667"
                        cy="3.66667"
                        r="3.66667"
                        transform="rotate(90 3.66667 3.66667)"
                        fill="#223581"
                        fillOpacity={isOpen ? "1" : "0.08"}
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="fixed w-48 bg-white rounded-lg shadow-[7px_11px_34px_#22358114] border border-gray-200 z-[9999]"
                    style={{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                    }}
                >
                    <div className="py-1">
                        <button
                            onClick={handleView}
                            className="flex cursor-pointer items-center w-full px-4 py-2 2xl:text-[18px] lg:text-base text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                            <svg className="2xl:w-[25px] 2xl:h-[25px] w-[20px] h-[20px] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details
                        </button>
                        <button
                            onClick={handleEdit}
                            className="flex items-center cursor-pointer w-full px-4 py-2 2xl:text-[18px] lg:text-base text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                            <svg className="2xl:w-[25px] 2xl:h-[25px] w-[20px] h-[20px] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Driver
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center cursor-pointer w-full px-4 py-2 2xl:text-[18px] lg:text-base text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                            <svg className="2xl:w-[25px] 2xl:h-[25px] w-[20px] h-[20px] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete Driver
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;