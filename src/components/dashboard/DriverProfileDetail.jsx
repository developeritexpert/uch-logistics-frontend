"use client";

import { useRef, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import Image from 'next/image';
import Link from "next/link";
import CustomDropdown from '@/components/layout/CustomDropdown';


const drivers = [
    {
        id: 1,
        docket: "10848299",
        driver: "Vikas Sabharwal",
        callsign: "VIKAS",
        date: "11/3/2025 5:00:00 AM",
        journey: "SLOUGH - KIDLINGTON",
        driverTotal: 21.15,
        actions: "",
    },
    {
        id: 2,
        docket: "10848400",
        driver: "Andrei Toluntan",
        callsign: "XANDRETT",
        date: "11/3/2025 5:00:00 AM",
        journey: "LHR - ASCOT",
        driverTotal: 25.28,
    },
    {
        id: 3,
        docket: "10848299",
        driver: "Catalin Constantin Potur",
        callsign: "CATALIN",
        date: "11/3/2025 5:00:00 AM",
        journey: "LHR - MILTON KEYNES",
        driverTotal: 60.3,
    },
    {
        id: 4,
        docket: "10848416",
        driver: "Georgian-Alin Iacob",
        callsign: "IACOB",
        date: "11/3/2025 5:00:00 AM",
        journey: "LHR - ST. NEOTS",
        driverTotal: 67.42,
    },
    {
        id: 5,
        docket: "10848436",
        driver: "Mihai Gabriel Iacob",
        callsign: "MIHAI",
        date: "11/3/2025 5:00:00 AM",
        journey: "LHR - BRISTOL",
        driverTotal: 124.47,
    },
    {
        id: 6,
        docket: "10848479",
        driver: "Charnjit Singh Sangha",
        callsign: "CHARAN",
        date: "11/3/2025 5:00:00 AM",
        journey: "LHR - SLOUGH",
        driverTotal: 85.25,
    },
    {
        id: 7,
        docket: "10848484",
        driver: "Bogdan Vasile Podariu",
        callsign: "XBOGDAN",
        date: "11/3/2025 5:00:00 AM",
        journey: "LHR - GREAT YARMOUTH",
        driverTotal: 110.2,
    },
    {
        id: 8,
        docket: "10848509",
        driver: "Alexandru Ionut Negru",
        callsign: "NEGRU",
        date: "11/3/2025 5:00:00 AM",
        journey: "LHR - WINDSOR",
        driverTotal: 13.59,
    },
    {
        id: 9,
        docket: "10848529",
        driver: "Vikas Sabharwal",
        callsign: "VIKAS",
        date: "11/3/2025 5:00:00 AM",
        journey: "LHR - MILTON KEYNES",
        driverTotal: 20.37,
    },
    {
        id: 10,
        docket: "10848540",
        driver: "Andrei Toluntan",
        callsign: "XANDRETT",
        date: "11/3/2025 5:00:00 AM",
        journey: "LHR - PORT TALBOT",
        driverTotal: 169.88,
    },
];



function DriverProfileDetail() {
     const dateRef = useRef(null);


    const [open, setOpen] = useState(false);

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
            <Breadcrumb
                items={[
                    { href: "/dashboard", isHome: true },
                    { label: "Driver Profiles", href: "/driver-profiles" },
                    { label: "Vikas Sabharwal" },
                ]}
            />


            <div className=" w-full flex flex-col lg:flex-row gap-[30px] mt-[30px] ">

                <div className="bg-white rounded-[15px] border border-[#22358114] py-[22px]  px-[20px] xl:basis-[312px] xl:shrink-0 ">
                    <div className="flex flex-col items-center text-center">

                        <div className="w-[53px] h-[53px] rounded-full ">
                            <Image src="/img/user-img.png" alt="" width={200} height={200}
                                className="object-cover" />
                        </div>

                        <h3 className="mt-3 text-[18px] md:text-[20px] xl:text-[22px] font-black text-primary ">
                            Vikas Sabharwal
                        </h3>
                        <p className="2xl:text-[15px] text-sm text-[#515151]">10848299</p>
                    </div>
                    <div className="border-b border-[#22358114] mt-[20px] mb-[25px]"></div>
                    <div className="space-y-3 text-sm text-[#515151]">
                        <div className="flex justify-between">
                            <span className="font-bold">Callsign:</span>
                            <span className="font-normal">Vikas</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Position:</span>
                            <span className="font-normal">Van Driver</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Account:</span>
                            <span className="font-normal">5002</span>
                        </div>
                    </div>

                    <div className="mt-[25px] flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                        <Link href="/driver-profile-edit" className="block text-center flex-1 min-w-[80px] cursor-pointer rounded-[6px] bg-primary border border-primary px-[20px] py-[10px] text-sm font-semibold text-white hover:bg-primary/20 hover:text-primary duration-300 transition">
                            Edit Info
                        </Link>
                        <button className="flex-1 min-w-[80px] cursor-pointer rounded-[6px] bg-secondary border border-secondary px-[20px] py-[10px] text-sm font-semibold text-white hover:bg-secondary/20 hover:text-secondary duration-300 transition">
                            Delete Profile
                        </button>
                    </div>
                </div>


                <div className="flex-1  bg-white  rounded-xl border border-[#22358114] grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3">

                    <div className=" py-[20px] px-[10px]  md:py-[30px]  md:pl-[30px] 2xl:pl-[41px] md:pr-[30px] border-b md:border-b-0 md:border-r border-[#22358114]">
                        <h4 className="font-bold text-primary text-[17px] sm:text-[19px] mb-[15px]">
                            Contact Information
                        </h4>

                        <div className="space-y-3 text-sm text-[#515151]">
                            <p><span className="font-bold ">Address:</span><br />4941 Hott Street<br />Oklahoma City, OK 73109</p>
                            <p><span className="font-bold ">Email:</span><br />vikassabharwal@gmail.com</p>
                            <p><span className="font-bold ">Phone:</span><br />+1 405 636 2685</p>
                        </div>
                    </div>


                    <div className="px-[10px] py-[20px] md:py-[30px] md:pl-[30px] md:pr-[30px]  2xl:pl-[59px] border-b md:border-b-0 md:border-r border-[#22358114]">
                        <h4 className="font-bold text-primary text-[17px] sm:text-[19px] mb-[15px]">
                            Payment Details
                        </h4>

                        <div className="space-y-3 text-sm text-[#515151]">
                            <p><span className="font-bold">Rate:</span><br />$21.02/hour</p>
                            <p><span className="font-bold">Bank Account Number:</span><br />5450 3205 7611 0692</p>
                            <p><span className="font-bold">Sort Code / IBAN:</span><br />IT 243 0E7 93 9138 871 1</p>
                            <p><span className="font-bold">Payroll ID:</span><br />2295072524</p>
                        </div>
                    </div>


                    <div className="px-[10px] py-[20px] md:py-[30px] md:pl-[30px] md:pr-[30px] 2xl:pl-[59px] ">
                        <h4 className="font-bold text-primary text-[17px] sm:text-[19px] mb-[15px]">
                            Operational Details
                        </h4>

                        <div className="space-y-3 text-sm text-[#515151]">
                            <p><span className="font-bold">Working as:</span><br />Per Hours</p>
                            <p>
                                <span className="font-bold">Status:</span><br />
                                <span className="text-green-600 font-normal">Active</span>
                            </p>
                        </div>
                    </div>

                </div>

            </div>
            <h2 className="text-[18px] md:text-[22px] lg:text-[25px] font-bold text-primary mt-[30px]">Journey Completed</h2>

            <section className="mt-[30px]">

                <div className="flex flex-wrap  xl:flex-nowrap items-center justify-between  gap-[40px] mb-6">


                    <div className="flex  flex-col items-start sm:flex-row sm:items-center  flex-wrap xl:flex-nowrap gap-[20px] w-full xl:w-[70%]">
                        <span className="text-[20px] font-bold">
                            Filter:
                        </span>

                        <div className='flex w-full sm:w-[fit-content] flex-col sm:flex-row  items-center gap-[15px]'>
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

                        <div className="relative  w-full max-w-[624px] ">
                            <input
                                type="text"
                                placeholder="Search with name, callsign, Journey etc..."
                                className="2xl:py-[12px] py-[10px] pl-[16px] pr-[60px] w-full rounded-md border border-[#22358114] focus-visible:!outline-0 duration-300 focus-visible:border-[#515151] px-[13px] text-[#B4B4B4] text-[16px] font-normal   "
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

                        <div>

                            <button
                                onClick={() => setOpen(true)}
                                className="min-w-[100px] cursor-pointer rounded-[6px] bg-secondary border border-secondary px-[25px] 2xl:py-[13px] py-[10px] 2xl:text-[18px] text-sm font-semibold text-white hover:bg-secondary/20 hover:text-secondary duration-300 transition" >
                                Generate Invoice
                            </button>


                            {open && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-scroll  no-scrollbar">

                                    <div className="relative w-full max-w-[580px] mx-[10px] my-[50px] rounded-xl bg-white p-[35px] pt-[40px]">


                                        <div className="flex items-center justify-between mb-[30px] ">
                                            <h2 className=" mx-auto text-[20px] md:text-[24px] lg:text-[34px] font-black text-primary">
                                                Pay Adjustment Detail
                                            </h2>

                                            <button
                                                onClick={() => setOpen(false)}
                                                className="w-5 h-5 md:w-8 md:h-8 rounded-full absolute top-[20px] right-[20px] bg-secondary text-white flex items-center justify-center text-lg font-bold" >
                                                <svg
                                                    viewBox="0 0 14 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-[10px] h-[10px] md:w-[14px] md:h-[14px]"
                                                >
                                                    <path
                                                        d="M11.9268 13.4982L6.90334 8.4747L1.78513 13.5929L-0.000174888 11.8076L5.11804 6.6894L0.1192 1.69055L1.72608 0.0836703L6.72493 5.08251L11.8074 2.39727e-06L13.5927 1.7853L8.51023 6.86781L13.5337 11.8913L11.9268 13.4982Z"
                                                        fill="white"
                                                    />
                                                </svg>

                                            </button>
                                        </div>


                                        <div className="text-[14px] sm:text-[16px] font-normal text-[#515151]">

                                            <div className="flex justify-between mb-4 py-[18px] border-y border-[#EEEFF5]">
                                                <span className=" font-bold">Docket Total</span>
                                                <span>1,471.30</span>
                                            </div>


                                            <div className="grid grid-cols-3 gap-[12px]  font-bold mb-2">
                                                <span>Description</span>
                                                <span>Value</span>
                                                <span>VAT</span>
                                            </div>


                                            <div className="grid grid-cols-3 gap-3 mb-2 flex items-center">
                                                <span>Admin Fee</span>
                                                <input
                                                    defaultValue="-9.00"
                                                    className="border text-[14px] border-[#22358114] rounded px-[20px] py-[10px] focus:border-[#515151] duration-300 focus-visible:!outline-0"
                                                />
                                                <input
                                                    defaultValue="+20.00%"
                                                    className=" text-[14px] border border-[#22358114] rounded px-[20px] py-[10px] focus:border-[#515151] duration-300 focus-visible:!outline-0"
                                                />
                                            </div>


                                            <div className="grid grid-cols-3 gap-3 mb-2">
                                                <span>Vehicle Hire charges</span>
                                                <input
                                                    defaultValue="-"
                                                    className="border text-[14px] border-[#22358114] rounded px-[20px] py-[10px] focus:border-[#515151] duration-300 focus-visible:!outline-0"
                                                />
                                                <input
                                                    defaultValue="-"
                                                    className=" text-[14px] border border-[#22358114] rounded px-[20px] py-[10px] focus:border-[#515151] duration-300 focus-visible:!outline-0"
                                                />
                                            </div>


                                            <div className="grid grid-cols-3 gap-3 mb-2">
                                                <span>Insurance charge</span>
                                                <input
                                                    defaultValue="-"
                                                    className="border text-[14px] border-[#22358114] rounded px-[20px] py-[10px] focus:border-[#515151] duration-300 focus-visible:!outline-0"
                                                />
                                                <input
                                                    defaultValue="-"
                                                    className=" text-[14px] border border-[#22358114] rounded px-[20px] py-[10px] focus:border-[#515151] duration-300 focus-visible:!outline-0"
                                                />
                                            </div>


                                            <div className="grid grid-cols-3 gap-3 mb-2">
                                                <span>Fuel charge</span>
                                                <input
                                                    defaultValue="-330.26"
                                                    className="border text-[14px] border-[#22358114] rounded px-[20px] py-[10px] focus:border-[#515151] duration-300 focus-visible:!outline-0"
                                                />
                                                <input
                                                    defaultValue="-"
                                                    className=" text-[14px] border border-[#22358114] rounded px-[20px] py-[10px] focus:border-[#515151] duration-300 focus-visible:!outline-0"
                                                />
                                            </div>


                                            <div className="grid grid-cols-3 gap-3 mb-2 items-center">
                                                <span>Any additional charges</span>

                                                <input
                                                    defaultValue="-"
                                                    className="col-span-2 border text-[14px] border-[#22358114] rounded px-[20px] py-[10px] focus:border-[#515151] duration-300 focus-visible:!outline-0"
                                                />
                                            </div>

                                            <div className="border-b border-[#EEEFF5] mt-[30px] mb-[20px]"></div>

                                            <div className="grid grid-cols-3 gap-3 mt-4 ">
                                                <span className="font-bold">Total</span>
                                                <span>-339.26</span>
                                                <span>-1.80</span>
                                            </div>


                                            <div className="bg-[#22358114] rounded-[15px] p-4 mt-[25px]">
                                                <div className="flex justify-between text-primary font-bold">
                                                    <span>Adjustment Total:</span>
                                                    <span>-341.06</span>
                                                </div>
                                                <div className="flex justify-between mt-[15px] text-primary font-bold">
                                                    <span>Total:</span>
                                                    <span>1,130.24</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center mt-[28px]">
                                            <button className="min-w-[100px] cursor-pointer rounded-[6px] bg-secondary border border-secondary px-[25px] 2xl:py-[13px] py-[10px] 2xl:text-[18px] text-sm font-semibold text-white hover:bg-secondary/20 hover:text-secondary duration-300 transition">
                                                Generate Invoice
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className='w-full overflow-x-scroll'>
                    <table className='w-full border-separate border-spacing-y-3 '>
                        <thead className=' text-[16px] sm:text-[18px] lg:text-[20px] font-bold'>
                            <tr>
                                <th className='text-center px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Docket</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap '>Drivers</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Callsign</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Date/Time</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Journey</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Driver Total</th>
                                <th className='text-left px-[20px] py-[5px] 2xl:text-[20px] whitespace-nowrap'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-[16px] text-normal text-[#515151]'>
                            {drivers.map((driver) => (
                                <tr key={driver.id} className='bg-white'>
                                    <td className=" px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] border-l rounded-l-[15px]">
                                        <label className="group flex items-center  gap-[15px] cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                            />
                                            <span
                                                className="w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] rounded-[4px] border border-[#D1D5DB] flex items-center justify-center transition-all
                                                 group-has-[:checked]:border-[#1E3A8A]
                                                 group-has-[:checked]:bg-[#1E3A8A]">
                                                <svg
                                                    className="w-3 h-3 lg:w-4 lg:h-4
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

                                            <span >
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
                                        {driver.journey}
                                    </td>
                                    <td className='px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap'>
                                        {driver.driverTotal}
                                    </td>

                                    <td className='px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] border-r rounded-r-[15px] whitespace-nowrap'>
                                        <div className='flex justify-center'>

                                            <CustomDropdown
                                                driverId={driver.id}
                                                driverName={driver.driver}
                                                onView={handleView}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                            />
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
    );
}

export default DriverProfileDetail;