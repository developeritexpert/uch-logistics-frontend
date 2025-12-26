"use client";

import React, { useState, version } from 'react';
import { useRef } from "react";
import PaidCustomDropdown from '../layout/PaidCustomDropdown';

const drivers = [
    {
        id: 1,
        docket: "10848299",
        driver: "Vikas Sabharwal",
        callsign: "VIKAS",
        date: "12/02/2025 - 11/3/2025",
        status: "Paid",
        driverTotal: "$1,130.24",

    },
    {
        id: 2,
        docket: "10848400",
        driver: "Andrei Toluntan",
        callsign: "XANDRETT",
        date: "12/02/2025 - 11/3/2025",
        status: "Paid",
        driverTotal: "$1,130.24",
    },
    {
        id: 3,
        docket: "10848299",
        driver: "Catalin Constantin Potur",
        callsign: "CATALIN",
        date: "12/02/2025 - 11/3/2025",
        status: "Paid",
        driverTotal: "$1,130.24",
    },
    {
        id: 4,
        docket: "10848416",
        driver: "Georgian-Alin Iacob",
        callsign: "IACOB",
        date: "12/02/2025 - 11/3/2025",
        status: "Paid",
        driverTotal: "$1,130.24",
    },
    {
        id: 5,
        docket: "10848436",
        driver: "Mihai Gabriel Iacob",
        callsign: "MIHAI",
        date: "12/02/2025 - 11/3/2025",
        status: "Paid",
        driverTotal: "$1,130.24",
    },
    {
        id: 6,
        docket: "10848479",
        driver: "Charnjit Singh Sangha",
        callsign: "CHARAN",
        date: "12/02/2025 - 11/3/2025",
        status: "Pending",
        driverTotal: "$1,130.24",
    },
    {
        id: 7,
        docket: "10848484",
        driver: "Bogdan Vasile Podariu",
        callsign: "XBOGDAN",
        date: "12/02/2025 - 11/3/2025",
        status: "Paid",
        driverTotal: "$1,130.24",
    },
    {
        id: 8,
        docket: "10848509",
        driver: "Alexandru Ionut Negru",
        callsign: "NEGRU",
        date: "12/02/2025 - 11/3/2025",
        status: "Pending",
        driverTotal: "$1,130.24",
    },
    {
        id: 9,
        docket: "10848529",
        driver: "Vikas Sabharwal",
        callsign: "VIKAS",
        date: "12/02/2025 - 11/3/2025",
        status: "Paid",
        driverTotal: "$1,130.24",
    },
    {
        id: 10,
        docket: "10848540",
        driver: "Andrei Toluntan",
        callsign: "XANDRETT",
        date: "12/02/2025 - 11/3/2025",
        status: "Paid",
        driverTotal: "$1,130.24",
    },
];

version

function Invoices() {
      const dateRef = useRef(null);

    const [selectedDrivers, setSelectedDrivers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const activeDrivers = drivers.filter(driver => driver.status === "Active");
    const inactiveDrivers = drivers.filter(driver => driver.status === "Inactive");

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedDrivers(drivers.map(driver => driver.id));
        } else {
            setSelectedDrivers([]);
        }
    };

    const handleSelectDriver = (driverId) => {
        if (selectedDrivers.includes(driverId)) {
            setSelectedDrivers(selectedDrivers.filter(id => id !== driverId));
        } else {
            setSelectedDrivers([...selectedDrivers, driverId]);
        }
    };

    const handleView = (driverId, driverName) => {
        console.log(`View driver: ${driverName} (ID: ${driverId})`);
        alert(`Viewing details for ${driverName}`);
    };

    const handleEdit = (driverId, driverName) => {
        console.log(`Edit driver: ${driverName} (ID: ${driverId})`);
        alert(`Editing driver: ${driverName}`);
    };

    const handleDelete = (driverId, driverName) => {
        console.log(`Delete driver: ${driverName} (ID: ${driverId})`);
        if (confirm(`Are you sure you want to delete ${driverName}?`)) {
            alert(`Driver ${driverName} deleted successfully`);
        }
    };

    return (
        <div>
            <section className="">

                <div className="flex flex-wrap  xl:flex-nowrap items-center justify-between  gap-[40px] mb-6">


                    <div className="flex  flex-col items-start sm:flex-row sm:items-center  flex-wrap lg:flex-nowrap gap-[20px] w-full xl:w-[70%]">
                        <span className="text-[20px] font-bold">
                            Filter:
                        </span>

                        <div className='flex w-full sm:w-[fit-content] flex-col flex-wrap md:flex-nowrap sm:flex-row  items-center gap-[15px]'>
                            {/* <div className="relative w-full ]">
                                <input
                                    type="date"
                                    className="px-[16px] 2xl:py-[15px] py-[10] w-full sm:w-[155px] rounded-[6px] border border-[#22358114] focus-visible:!outline-0 duration-300 focus-visible:border-[#515151] px-[13px] text-[#B4B4B4] text-[16px] font-normal "
                                />
                            </div> */}
                            <div className="relative w-full sm:w-[155px]" onClick={() => dateRef.current?.showPicker()}>
                                <input ref={dateRef}
                                    type="date"
                                    className="
                                         w-full  px-[16px] pr-[42px] 2xl:py-[15px] py-[10px] rounded-[6px] border border-[#22358114] text-[#515151]
                                         text-[16px] font-normal focus:outline-none focus:border-[#515151]  appearance-none  "/>
                                    <span className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2">
                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.832 1.42737H13.3531V0.657207C13.3531 0.294267 13.0588 0 12.6958 0C12.3329 0 12.0386 0.294267 12.0386 0.657207V1.42737H7.04925V0.657207C7.04925 0.294267 6.75499 0 6.39205 0C6.02911 0 5.73484 0.294267 5.73484 0.657207V1.42737H3.25587C1.46042 1.42737 0 2.88796 0 4.6834V13.8874C0 15.6591 1.44117 17.1002 3.21255 17.1002H15.8753C17.6467 17.1002 19.0879 15.6591 19.0879 13.8874V4.6834C19.0879 2.88796 17.6275 1.42737 15.832 1.42737ZM3.25587 2.74179H5.73484V3.12318C5.73484 3.48612 6.02911 3.78039 6.39205 3.78039C6.75499 3.78039 7.04925 3.48612 7.04925 3.12318V2.74179H12.0386V3.12318C12.0386 3.48612 12.3329 3.78039 12.6958 3.78039C13.0588 3.78039 13.3531 3.48612 13.3531 3.12318V2.74179H15.832C16.9025 2.74179 17.7735 3.61271 17.7735 4.6834V5.30676H1.31441V4.6834C1.31441 3.61271 2.18534 2.74179 3.25587 2.74179ZM15.8753 15.7858H3.21255C2.16577 15.7858 1.31441 14.9341 1.31441 13.8874V6.62117H17.7735V13.8874C17.7735 14.9341 16.9221 15.7858 15.8753 15.7858Z" fill="#515151" />
                                        <path d="M5.15479 8.56584H4.17283C3.80989 8.56584 3.51562 8.86011 3.51562 9.22305C3.51562 9.58599 3.80989 9.88026 4.17283 9.88026H5.15479C5.51773 9.88026 5.812 9.58599 5.812 9.22305C5.812 8.86011 5.51773 8.56584 5.15479 8.56584Z" fill="#515151" />
                                        <path d="M10.0357 8.56584H9.05369C8.69075 8.56584 8.39648 8.86011 8.39648 9.22305C8.39648 9.58599 8.69075 9.88026 9.05369 9.88026H10.0357C10.3986 9.88026 10.6929 9.58599 10.6929 9.22305C10.6929 8.86011 10.3986 8.56584 10.0357 8.56584Z" fill="#515151" />
                                        <path d="M14.9146 8.56584H13.9326C13.5697 8.56584 13.2754 8.86011 13.2754 9.22305C13.2754 9.58599 13.5697 9.88026 13.9326 9.88026H14.9146C15.2775 9.88026 15.5718 9.58599 15.5718 9.22305C15.5718 8.86011 15.2775 8.56584 14.9146 8.56584Z" fill="#515151" />
                                        <path d="M5.15479 11.9369H4.17283C3.80989 11.9369 3.51562 12.2312 3.51562 12.5941C3.51562 12.9571 3.80989 13.2513 4.17283 13.2513H5.15479C5.51773 13.2513 5.812 12.9571 5.812 12.5941C5.812 12.2312 5.51773 11.9369 5.15479 11.9369Z" fill="#515151" />
                                        <path d="M10.0357 11.9369H9.05369C8.69075 11.9369 8.39648 12.2312 8.39648 12.5941C8.39648 12.9571 8.69075 13.2513 9.05369 13.2513H10.0357C10.3986 13.2513 10.6929 12.9571 10.6929 12.5941C10.6929 12.2312 10.3986 11.9369 10.0357 11.9369Z" fill="#515151" />
                                        <path d="M14.9146 11.9369H13.9326C13.5697 11.9369 13.2754 12.2312 13.2754 12.5941C13.2754 12.9571 13.5697 13.2513 13.9326 13.2513H14.9146C15.2775 13.2513 15.5718 12.9571 15.5718 12.5941C15.5718 12.2312 15.2775 11.9369 14.9146 11.9369Z" fill="#515151" />
                                    </svg>

                                </span>
                            </div>

                            <p className='text-[#515151]'>To</p>


                          <div className="relative w-full sm:w-[155px]" onClick={() => dateRef.current?.showPicker()}>
                                <input ref={dateRef}
                                    type="date"
                                    className="
                                         w-full  px-[16px] pr-[42px] 2xl:py-[15px] py-[10px] rounded-[6px] border border-[#22358114] text-[#515151]
                                         text-[16px] font-normal focus:outline-none focus:border-[#515151]  appearance-none "/>
                                    <span className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2">
                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.832 1.42737H13.3531V0.657207C13.3531 0.294267 13.0588 0 12.6958 0C12.3329 0 12.0386 0.294267 12.0386 0.657207V1.42737H7.04925V0.657207C7.04925 0.294267 6.75499 0 6.39205 0C6.02911 0 5.73484 0.294267 5.73484 0.657207V1.42737H3.25587C1.46042 1.42737 0 2.88796 0 4.6834V13.8874C0 15.6591 1.44117 17.1002 3.21255 17.1002H15.8753C17.6467 17.1002 19.0879 15.6591 19.0879 13.8874V4.6834C19.0879 2.88796 17.6275 1.42737 15.832 1.42737ZM3.25587 2.74179H5.73484V3.12318C5.73484 3.48612 6.02911 3.78039 6.39205 3.78039C6.75499 3.78039 7.04925 3.48612 7.04925 3.12318V2.74179H12.0386V3.12318C12.0386 3.48612 12.3329 3.78039 12.6958 3.78039C13.0588 3.78039 13.3531 3.48612 13.3531 3.12318V2.74179H15.832C16.9025 2.74179 17.7735 3.61271 17.7735 4.6834V5.30676H1.31441V4.6834C1.31441 3.61271 2.18534 2.74179 3.25587 2.74179ZM15.8753 15.7858H3.21255C2.16577 15.7858 1.31441 14.9341 1.31441 13.8874V6.62117H17.7735V13.8874C17.7735 14.9341 16.9221 15.7858 15.8753 15.7858Z" fill="#515151" />
                                        <path d="M5.15479 8.56584H4.17283C3.80989 8.56584 3.51562 8.86011 3.51562 9.22305C3.51562 9.58599 3.80989 9.88026 4.17283 9.88026H5.15479C5.51773 9.88026 5.812 9.58599 5.812 9.22305C5.812 8.86011 5.51773 8.56584 5.15479 8.56584Z" fill="#515151" />
                                        <path d="M10.0357 8.56584H9.05369C8.69075 8.56584 8.39648 8.86011 8.39648 9.22305C8.39648 9.58599 8.69075 9.88026 9.05369 9.88026H10.0357C10.3986 9.88026 10.6929 9.58599 10.6929 9.22305C10.6929 8.86011 10.3986 8.56584 10.0357 8.56584Z" fill="#515151" />
                                        <path d="M14.9146 8.56584H13.9326C13.5697 8.56584 13.2754 8.86011 13.2754 9.22305C13.2754 9.58599 13.5697 9.88026 13.9326 9.88026H14.9146C15.2775 9.88026 15.5718 9.58599 15.5718 9.22305C15.5718 8.86011 15.2775 8.56584 14.9146 8.56584Z" fill="#515151" />
                                        <path d="M5.15479 11.9369H4.17283C3.80989 11.9369 3.51562 12.2312 3.51562 12.5941C3.51562 12.9571 3.80989 13.2513 4.17283 13.2513H5.15479C5.51773 13.2513 5.812 12.9571 5.812 12.5941C5.812 12.2312 5.51773 11.9369 5.15479 11.9369Z" fill="#515151" />
                                        <path d="M10.0357 11.9369H9.05369C8.69075 11.9369 8.39648 12.2312 8.39648 12.5941C8.39648 12.9571 8.69075 13.2513 9.05369 13.2513H10.0357C10.3986 13.2513 10.6929 12.9571 10.6929 12.5941C10.6929 12.2312 10.3986 11.9369 10.0357 11.9369Z" fill="#515151" />
                                        <path d="M14.9146 11.9369H13.9326C13.5697 11.9369 13.2754 12.2312 13.2754 12.5941C13.2754 12.9571 13.5697 13.2513 13.9326 13.2513H14.9146C15.2775 13.2513 15.5718 12.9571 15.5718 12.5941C15.5718 12.2312 15.2775 11.9369 14.9146 11.9369Z" fill="#515151" />
                                    </svg>

                                </span>
                            </div>
                        </div>

                        <div className="relative  w-full 2xl:min-w-[624px] xl:!min-w-[350px]">
                            <input
                                type="text"
                                placeholder="Search with name, callsign, Journey etc..."
                                className="pl-[16px] pr-[60px] 2xl:py-[15px] py-[10] w-full rounded-md border border-[#22358114] focus-visible:!outline-0 duration-300 focus-visible:border-[#515151] px-[13px] text-[#B4B4B4] text-[16px] font-normal   "
                            />
                            <svg
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24" >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>

                        </div>
                    </div>


                    <div className="flex items-center gap-3">
                        <button className=" gap-2 rounded-md bg-secondary border border-secondary hover:bg-secondary/20 hover:text-secondary 2xl:py-[12px] py-[10px] px-[25px] min-w-[100px] duration-300 leading-normal 2xl:text-[18px] text-sm cursor-pointer font-semibold text-white transition">
                            Generate Invoice
                        </button>
                    </div>
                </div>


                <div className='w-full overflow-x-scroll'>
                    <table className='w-full border-separate border-spacing-y-3'>
                        <thead className='text-[16px] md:text-[18px] lg:text-[20px] text-bold'>
                            <tr>
                                <th className='text-center px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>#ID</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Drivers</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Callsign</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Date</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Driver Total</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Status</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-[16px] text-normal text-[#515151]'>
                            {drivers.map((driver) => (
                                <tr key={driver.id} className='bg-white'>
                                    <td className="pl-[50px] pr-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] border-l rounded-l-[15px] whitespace-nowrap">
                                        <label className="group flex items-center  gap-[15px] cursor-pointer select-none">

                                            <input
                                                type="checkbox"
                                                className="hidden"
                                            />

                                            <span
                                                className="w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]   rounded-[4px] border border-[#D1D5DB] flex items-center justify-center transition-all
                                                 group-has-[:checked]:border-[#1E3A8A]
                                                 group-has-[:checked]:bg-[#1E3A8A]">
                                                <svg
                                                    className=" w-3 h-3 lg:w-4 lg:h-4
                                                    opacity-0 transition group-has-[:checked]:opacity-100" viewBox="0 0 12 10" fill="none">
                                                    <path
                                                        d="M1 5L4.5 8.5L11 1"
                                                        stroke="white"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                            <span>
                                                {driver.docket}
                                            </span>
                                        </label>
                                    </td>
                                    <td className='px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap'>
                                        {driver.driver}
                                    </td>
                                    <td className='px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap'>
                                        {driver.callsign}
                                    </td>
                                    <td className='px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap'>
                                        {driver.date}
                                    </td>
                                    <td className='px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap'>
                                        {driver.driverTotal}
                                    </td>
                                    <td className='px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114]'>
                                        <span className={`2xl:text-base text-sm font-medium  ${driver.status === "Paid"
                                            ? "text-[#009249]"
                                            : "text-[#C00000]"}`}>
                                            {driver.status}
                                        </span>
                                    </td>




                                    {/* <td className='px-[20px] py-[20px] border-y border-[#22358114] border-r rounded-r-[15px]'>
                                    <div className='flex justify-center'>
                                        {driver.actions}
                                        <CustomDropdown
                                            driverId={driver.id}
                                            driverName={driver.driver}
                                            onView={handleView}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    </div>
                                </td> */}

                                    <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] border-r rounded-r-[15px]">
                                        <div className="flex justify-center">
                                            <PaidCustomDropdown />
                                        </div>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-center mt-8">
                    <div className="flex gap-2">
                        <button className="group px-3 border border-[#22358114] w-[40px] h-[40px] hover:border-secondary hover:bg-secondary text-[#515151] hover:text-primary rounded-[50%] text-sm duration-300 flex items-center justify-center">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.63267 10.8552C5.58042 10.9109 5.50943 10.9424 5.43524 10.9428C5.39842 10.9432 5.36191 10.9356 5.32796 10.9205C5.29401 10.9055 5.26333 10.8832 5.2378 10.8552L0.582305 5.93362C0.556159 5.90634 0.5354 5.87384 0.52123 5.83801C0.507061 5.80219 0.499764 5.76374 0.499764 5.7249C0.499764 5.68607 0.507061 5.64762 0.52123 5.61179C0.5354 5.57596 0.556159 5.54346 0.582305 5.51618L5.2378 0.593579C5.2634 0.564651 5.29424 0.541462 5.32849 0.525392C5.36274 0.509323 5.3997 0.500701 5.43716 0.500041C5.47463 0.499381 5.51184 0.506695 5.54658 0.521548C5.58131 0.536402 5.61287 0.558491 5.63937 0.586502C5.66586 0.614512 5.68676 0.647871 5.70081 0.684594C5.71486 0.721316 5.72178 0.760652 5.72115 0.800259C5.72053 0.839866 5.71237 0.878936 5.69717 0.915143C5.68197 0.951349 5.66004 0.983954 5.63267 1.01101L1.17461 5.7249L5.63267 10.4377C5.6587 10.4651 5.67935 10.4976 5.69345 10.5334C5.70754 10.5693 5.7148 10.6077 5.7148 10.6465C5.7148 10.6853 5.70754 10.7237 5.69345 10.7595C5.67935 10.7953 5.6587 10.8278 5.63267 10.8552Z"
                                    className='fill-[#C00000] stroke-[#C00000] group-hover:fill-[#fff] group-hover:stroke-[#fff]' />
                            </svg>
                        </button>
                        <button className="px-3 border border-[#22358114] w-[40px] h-[40px] hover:border-primary text-[#515151] hover:text-primary rounded-[50%] text-sm duration-300">
                            1
                        </button>
                        <button className="px-3 border border-[#22358114] w-[40px] h-[40px] hover:border-primary text-[#515151] hover:text-primary rounded-[50%] text-sm duration-300">
                            2
                        </button>
                        <button className="px-3 border border-[#22358114] w-[40px] h-[40px] hover:border-primary text-[#515151] hover:text-primary rounded-[50%] text-sm duration-300">
                            3
                        </button>
                        <button className="group px-3 border border-[#22358114] w-[40px] h-[40px] hover:border-secondary hover:bg-secondary text-[#515151] hover:text-primary rounded-[50%] text-sm duration-300 flex items-center justify-center">
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.58852 10.8552C0.640767 10.9109 0.711764 10.9424 0.785955 10.9428C0.822775 10.9432 0.859278 10.9356 0.893227 10.9205C0.927176 10.9055 0.957857 10.8832 0.983389 10.8552L5.63889 5.93362C5.66503 5.90634 5.68579 5.87384 5.69996 5.83801C5.71413 5.80219 5.72143 5.76374 5.72143 5.7249C5.72143 5.68607 5.71413 5.64762 5.69996 5.61179C5.68579 5.57596 5.66503 5.54346 5.63889 5.51618L0.983389 0.593579C0.957791 0.564651 0.926949 0.541462 0.892699 0.525392C0.85845 0.509323 0.821492 0.500701 0.784026 0.500041C0.74656 0.499381 0.709352 0.506695 0.674614 0.521548C0.639877 0.536402 0.608321 0.558491 0.581825 0.586502C0.555329 0.614512 0.534434 0.647871 0.520384 0.684594C0.506333 0.721316 0.499414 0.760652 0.500039 0.800259C0.500663 0.839866 0.508819 0.878936 0.52402 0.915143C0.53922 0.951349 0.561156 0.983954 0.58852 1.01101L5.04658 5.7249L0.58852 10.4377C0.562494 10.4651 0.541839 10.4976 0.527744 10.5334C0.51365 10.5693 0.506394 10.6077 0.506394 10.6465C0.506394 10.6853 0.51365 10.7237 0.527744 10.7595C0.541839 10.7953 0.562494 10.8278 0.58852 10.8552Z"
                                    className='fill-[#C00000] stroke-[#C00000] group-hover:fill-[#fff] group-hover:stroke-[#fff]' />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Invoices