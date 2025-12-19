"use client"
import { useState } from "react";
import Breadcrumb from './Breadcrumb'
import Input from "../form/Input";
import Select from "../form/Select";
import Image from 'next/image';


export default function DriverProfileEdit() {
    const [photo, setPhoto] = useState(null);

    const handlePhotoUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        setPhoto(URL.createObjectURL(file));
    };
    return (
        <div>

            <Breadcrumb
                items={[
                    { href: "/dashboard", isHome: true },
                    { label: "Driver Profiles", href: "/driver-profiles" },
                    { label: "Vikas Sabharwal", href: "/driver-profile-detail" },
                    { label: "Profile Edit" },
                ]}
            />
            <div className="mx-auto bg-white rounded-lg shadow px-[10px] py-[20px] sm:p-[30px] md:p-[40px]">

                <h2 className="text-[18px] lg:text-[22px]  text-primary font-black mb-[20px]">
                    Driver Information
                </h2>
                <div className="flex flex-col  sm:flex-row items-center gap-[15px]">
                    <div className="w-[120px] h-[120px] rounded-[15px] border border-[#22358114] flex items-center justify-center overflow-hidden">
                        {photo ? (
                            <img src={photo} className="w-full h-full object-cover" />
                        ) : (
                            <span className="w-[53px] h-[53px] rounded-full">
                                <img src="img/user-img.png" alt="" />
                            </span>
                        )}
                    </div>
                    <div className="flex items-center flex-col gap-[14px]">
                        <label className="text-[16px] font-bold">Profile Photo</label>
                        <label className="text-sm font-bold bg-[#223581]/10 text-primary px-[22px] py-[12px] rounded cursor-pointer">
                            Upload Photo
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handlePhotoUpload} />
                        </label>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[30px] mt-[20px]">
                    <Input label="Name" defaultValue="Vikas Saharwal" />
                    <Input label="Callsign" defaultValue="Vikas" />
                    <Select
                        label="Position"
                        options={["Van Driver", "Truck Driver"]}
                    />
                    <Input label="Account" defaultValue="5002" />
                </div>



                <h2 className="text-[18px] lg:text-[22px]  text-primary font-black mb-[20px]">
                    Contact Information
                </h2>
                <div className="flex flex-col md:flex-row gap-[20px]">
                    <Input
                        label="Address"
                        wrapperClassName="flex-[2]"
                        defaultValue="4941 Holt Street Oklahoma City, OK"
                    />

                    <Input
                        label="Zip Code"
                        wrapperClassName="flex-1"
                        defaultValue="73109"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] my-[20px]">

                    <Input
                        label="Email"
                        defaultValue="vikassaharwal@gmail.com"
                    />
                    <Input
                        label="Phone"
                        defaultValue="+1 405 636 2685"
                    />
                </div>


                <h2 className="text-[18px] lg:text-[22px]  text-primary font-black mb-[20px]">
                    Payment Details
                </h2>                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[20px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] ">
                        <Input label="Rate" defaultValue="$21.02/hour" />
                        <div className=" flex items-end">
                            <Select wrapperClassName="w-full" options={["Full Time", "Part Time"]} />
                        </div>
                    </div>
                    <Input label="Bank Account Number" defaultValue="5450 3205 7611 0692" />
                    <Input label="Sort Code / IBAN" defaultValue="12 243 0E7 93 9138 871 1" />
                    <Input label="Payroll ID" defaultValue="2295072524" />
                </div>


               
                <h2 className="text-[18px] lg:text-[22px]  text-primary font-black mb-[20px]">
                    Operational Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[50px]">
                    <Select label="Working as" options={["Per hour", "Per day"]} />
                    <Select
                        label="Status"
                        options={["Active", "Inactive"]}
                        className="text-green-600"
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4">
                    <button className="bg-primary text-white text-sm font-bold px-[20px] py-[12px] rounded">
                        Save Changes
                    </button>
                    <button className="bg-secondary text-white text-sm font-bold px-[20px] py-[12px] rounded">
                        Cancel
                    </button>
                </div>
            </div>

        </div >
    )
}
