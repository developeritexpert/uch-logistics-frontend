"use client"
import { useState, useEffect } from "react";
import Breadcrumb from './Breadcrumb'
import Input from "../form/Input";
import Select from "../form/Select";

function AddNewDriver() {
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
  };

  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo);
    };
  }, [photo]);
  return (
    <div>
      <Breadcrumb
        items={[
          { href: "/dashboard", isHome: true },
          { label: "Driver Profiles", href: "/driver-profiles" },
          { label: "Profile Add New Driver" },
        ]}
      />

      <div className="mx-auto bg-white rounded-lg shadow px-[30px] py-[30px] md:px-[40px] md:py-[40px]">

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
          <Input label="Name" />
          <Input label="Callsign" />
          <Select
            label="Position"
            placeholder="Choose Position"
            options={["Van Driver", "Truck Driver"]}
          />
          <Input label="Account" />
        </div>


        <h2 className="text-[18px] lg:text-[22px]  text-primary font-black mb-[20px]">
          Contact Information
        </h2>

        <div className="flex flex-col md:flex-row gap-[20px]">
          <Input label="Address" wrapperClassName="flex-[2]" />
          <Input label="Zip Code" wrapperClassName="flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] my-[20px]">
          <Input label="Email" />
          <Input label="Phone" />
        </div>


        <h2 className="text-[18px] lg:text-[22px]  text-primary font-black mb-[20px]">
          Payment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] ">
            <Input label="Rate" />
            <div className=" flex items-end">
              <Select
                placeholder="Choose working hour type"
                options={["Choose working hour type", "Full Time", "Part Time"]}
              />
            </div>
          </div>

          <Input label="Bank Account Number" />
          <Input label="Sort Code / IBAN" />
          <Input label="Payroll ID" />
        </div>


        <h2 className="text-[18px] lg:text-[22px]  text-primary font-black mb-[20px]">
          Operational Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[50px]">
          <Select
            label="Working as"
            placeholder="Per hour"
            options={["Per hour", "Per day"]}
          />
          <Select
            label="Status"
            placeholder="Active"
            options={["Active", "Inactive"]}
            className="text-green-600"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-[10px]">
          <button className="bg-primary text-white text-sm font-bold px-[20px] py-[12px] rounded">
            Add Driver
          </button>
          <button className="bg-secondary text-white text-sm font-bold px-[20px] py-[12px] rounded">
            Cancel
          </button>
        </div>

      </div>





    </div>
  )
}

export default AddNewDriver