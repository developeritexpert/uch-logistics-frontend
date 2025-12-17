import React from 'react'
import Image from 'next/image'

const drivers = [
    {
        id: 1,
        docket: "10848299",
        driver: "Vikas Sabharwal",
        callsign: "Vikas",
        dateTime: "11/3/2025 5:00:00 AM",
        journey: "SLOUGH - KIDLINGTON",
        driverTotal: "$21.15"
    },
    {
        id: 2,
        docket: "10848400",
        driver: "Andrei Toluntan",
        callsign: "XANDREIT",
        dateTime: "11/3/2025 5:00:00 AM",
        journey: "LHR - ASCOT",
        driverTotal: "$25.28"
    },
    {
        id: 3,
        docket: "10848299",
        driver: "Catalin Constantin Potur",
        callsign: "CATALIN",
        dateTime: "11/3/2025 5:00:00 AM",
        journey: "LHR - MILTON KEYNES",
        driverTotal: "$60.30"
    },
    {
        id: 4,
        docket: "10848416",
        driver: "Georgian-Alin Iacob",
        callsign: "IACOB",
        dateTime: "11/3/2025 5:00:00 AM",
        journey: "LHR - ST. NEOTS",
        driverTotal: "$67.42"
    },
    {
        id: 5,
        docket: "10848436",
        driver: "Mihai Gabriel Iacob",
        callsign: "MIHAI",
        dateTime: "11/3/2025 5:00:00 AM",
        journey: "LHR - BRISTOL",
        driverTotal: "$124.47"
    }
];

function page() {
    return (
        <section>
            <div className='flex flex-wrap lg:flex-nowrap  items-stretch justify-between gap-[20px] lg:gap-[30px]'>
                <div className='basis-[100%] sm:basis-[48%] lg:basis-[33%] flex justify-between items-end gap-[30px] border border-[#22358114] bg-white rounded-[15px] p-[20px]'>
                    <Image alt="Total Jobs Listed" src="/icons/total-jobs-listed.png" height={100} width={100} className="w-[60px]" />
                    <div className='text-right'>
                        <p className='text-[#515151]'>Total Jobs Listed</p>
                        <span className='block text-primary text-[22px] md:text-[24px] lg:text-[30px] xl:text-[35px] font-bold'>500k</span>
                    </div>
                </div>
                <div className='basis-[100%] sm:basis-[48%] lg:basis-[33%] flex justify-between items-end gap-[30px] border border-[#22358114] bg-white rounded-[15px] p-[20px]'>
                    <Image alt="Total Jobs Listed" src="/icons/active-drivers.png" height={100} width={100} className="w-[60px]" />
                    <div className='text-right'>
                        <p className='text-[#515151]'>Active Drivers</p>
                        <span className='block text-primary text-[22px] md:text-[24px] lg:text-[30px] xl:text-[35px] font-bold'>80,000</span>
                    </div>
                </div>
                <div className='basis-[100%] sm:basis-[48%] lg:basis-[33%] flex justify-between items-end gap-[30px] border border-[#22358114] bg-white rounded-[15px] p-[20px]'>
                    <Image alt="Total Jobs Listed" src="/icons/total-revenue.png" height={100} width={100} className="w-[60px]" />
                    <div className='text-right'>
                        <p className='text-[#515151]'>Total Revenue</p>
                        <span className='block text-primary text-[22px] md:text-[24px] lg:text-[30px] xl:text-[35px] font-bold'>$32,000</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap sm:flex-nowrap items-center gap-[20px]  md:gap-[30px] justify-between mt-[30px] sm:mt-[35px] md:mt-[50px] mb-[20px]'>
                <h2 className=' text-[22px] md:text-[24px] lg:text-[30px] text-primary font-bold'>Recent Active Drivers</h2>
                <button className='bg-secondary rounded-[7px] px-[20px] py-[10px] text-sm text-white'>View All Drivers</button>
            </div>
            <div className='w-full overflow-x-scroll'>
                <table className='w-full border-separate border-spacing-y-3'>
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-left px-[20px] py-[10px]'>Docket</th>
                            <th className='text-left px-[20px] py-[10px]'>Drivers</th>
                            <th className='text-left px-[20px] py-[10px]'>Callsign</th>
                            <th className='text-left px-[20px] py-[10px] whitespace-nowrap'>Date/Time</th>
                            <th className='text-left px-[20px] py-[10px]'>Journey</th>
                            <th className='text-left px-[20px] py-[10px] whitespace-nowrap'>Driver Total</th>
                            <th className='text-left px-[20px] py-[10px] text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {drivers.map((items) => (
                            <tr key={items.id} className='text-[#515151] bg-white'>
                                <td className='px-[20px] py-[20px] border-y border-[#22358114] border-l rounded-l-[15px]'>
                                    <label className="group  cursor-pointer select-none">

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

                                        <span className="text-sm text-[#515151]">
                                        </span>
                                    </label>
                                </td>
                                <td className='px-[20px] py-[20px] border-y border-[#22358114] whitespace-nowrap'>{items.docket}</td>
                                <td className='px-[20px] py-[20px] border-y border-[#22358114] whitespace-nowrap'>{items.driver}</td>
                                <td className='px-[20px] py-[20px] border-y border-[#22358114] whitespace-nowrap'>{items.callsign}</td>
                                <td className='px-[20px] py-[20px] border-y border-[#22358114] whitespace-nowrap'>{items.dateTime}</td>
                                <td className='px-[20px] py-[20px] border-y border-[#22358114] whitespace-nowrap'>{items.journey}</td>
                                <td className='px-[20px] py-[20px] border-y border-[#22358114] whitespace-nowrap'>{items.driverTotal}</td>
                                <td className='px-[20px] py-[20px] border-y border-[#22358114] border-r rounded-r-[15px]'>
                                    <div className='flex justify-center'>
                                        <svg className='w-[25px]' width="33" height="8" viewBox="0 0 33 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="29.3334" cy="3.66667" r="3.66667" transform="rotate(90 29.3334 3.66667)" fill="#223581" fill-opacity="0.08" />
                                            <circle cx="16.5002" cy="3.66667" r="3.66667" transform="rotate(90 16.5002 3.66667)" fill="#223581" fill-opacity="0.08" />
                                            <circle cx="3.66667" cy="3.66667" r="3.66667" transform="rotate(90 3.66667 3.66667)" fill="#223581" fill-opacity="0.08" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default page