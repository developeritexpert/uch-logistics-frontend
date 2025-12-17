import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ driverId, driverName, onView, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
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
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* <button
                onClick={toggleDropdown}
                className="p-2 focus:outline-0"
                aria-label="Actions">
                <svg width="33" height="8" viewBox="0 0 33 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="29.3337" cy="3.66667" r="3.66667" transform="rotate(90 29.3337 3.66667)" fill="#223581" fill-opacity="0.08" />
                    <circle cx="16.5007" cy="3.66667" r="3.66667" transform="rotate(90 16.5007 3.66667)" fill="#223581" fill-opacity="0.08" />
                    <circle cx="3.66667" cy="3.66667" r="3.66667" transform="rotate(90 3.66667 3.66667)" fill="#223581" fill-opacity="0.08" />
                </svg>


            </button> */}
            <button
                onClick={toggleDropdown}
                className="p-2 focus:outline-0"
                aria-label="Actions">
                <svg
                    width="33"
                    height="8"
                    viewBox="0 0 33 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle
                        cx="29.3337"
                        cy="3.66667"
                        r="3.66667"
                        transform="rotate(90 29.3337 3.66667)"
                        fill="#223581"
                        fillOpacity={isOpen ? "1" : "0.08"}/>
                    <circle
                        cx="16.5007"
                        cy="3.66667"
                        r="3.66667"
                        transform="rotate(90 16.5007 3.66667)"
                        fill="#223581"
                        fillOpacity={isOpen ? "1" : "0.08"}/>
                    <circle
                        cx="3.66667"
                        cy="3.66667"
                        r="3.66667"
                        transform="rotate(90 3.66667 3.66667)"
                        fill="#223581"
                        fillOpacity={isOpen ? "1" : "0.08"}/>
                </svg>
            </button>



            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                        <button
                            onClick={handleView}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details
                        </button>
                        <button
                            onClick={handleEdit}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Driver
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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