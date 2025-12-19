"use client"
import { useState } from "react";
import Breadcrumb from './Breadcrumb'
import Input from "../form/Input";
import CustomSelect from "../layout/CustomSelect";

export default function DriverProfileEdit() {
    const [photo, setPhoto] = useState(null);
    const [formData, setFormData] = useState({
        position: "Van Driver",
        workingHoursType: "Full Time",
        workingAs: "Per hour",
        status: "Active"
    });

    const handlePhotoUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        setPhoto(URL.createObjectURL(file));
    };

    const handleSelectChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        console.log("Saving changes:", formData);
        // Add your save logic here
    };

    const handleCancel = () => {
        console.log("Canceling changes");
        // Add cancel logic here
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
            <div className="mx-auto bg-white rounded-lg shadow px-[10px] py-[20px] sm:p-[30px] md:p-[40px] mt-[20px]">

                <h2 className="text-[18px] lg:text-[22px] text-primary font-black mb-[20px]">
                    Driver Information
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-[15px]">
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
                        <label className="text-sm font-bold bg-[#223581]/10 text-primary px-[22px] py-[12px] rounded cursor-pointer hover:bg-[#223581]/20 duration-300 transition-colors">
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
                    <CustomSelect
                        label="Position"
                        options={["Van Driver", "Truck Driver"]}
                        defaultValue="Van Driver"
                        onChange={(value) => handleSelectChange('position', value)}
                    />
                    <Input label="Account" defaultValue="5002" />
                </div>

                <h2 className="text-[18px] lg:text-[22px] text-primary font-black mb-[20px]">
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

                <h2 className="text-[18px] lg:text-[22px] text-primary font-black mb-[20px]">
                    Payment Details
                </h2>                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[20px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                        <Input label="Rate" defaultValue="$21.02/hour" />
                        <div className="flex items-end w-full">
                            <CustomSelect 
                                options={["Full Time", "Part Time"]}
                                defaultValue="Full Time"
                                onChange={(value) => handleSelectChange('workingHoursType', value)}
                                wrapperClassName="w-full"
                            />
                        </div>
                    </div>
                    <Input label="Bank Account Number" defaultValue="5450 3205 7611 0692" />
                    <Input label="Sort Code / IBAN" defaultValue="12 243 0E7 93 9138 871 1" />
                    <Input label="Payroll ID" defaultValue="2295072524" />
                </div>

                <h2 className="text-[18px] lg:text-[22px] text-primary font-black mb-[20px]">
                    Operational Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[50px]">
                    <CustomSelect
                        label="Working as"
                        options={["Per hour", "Per day"]}
                        defaultValue="Per hour"
                        onChange={(value) => handleSelectChange('workingAs', value)}
                    />
                    <CustomSelect
                        label="Status"
                        options={["Active", "Inactive"]}
                        defaultValue="Active"
                        onChange={(value) => handleSelectChange('status', value)}
                        className="text-green-600"
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4">
                    <button 
                        className="bg-primary border border-primary hover:bg-primary/20 hover:text-primary duration-300 cursor-pointer text-white text-sm font-bold px-[25px] py-[12px] rounded-[6px] min-w-[150px]"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                    <button 
                        className="bg-secondary border border-secondary hover:bg-secondary/20 hover:text-secondary duration-300 cursor-pointer text-white text-sm font-bold px-[25px] py-[12px] rounded-[6px] min-w-[150px]"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}