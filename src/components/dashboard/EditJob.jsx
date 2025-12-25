"use client"
import React from 'react'
import Breadcrumb from './Breadcrumb'
import Input from '../form/Input'
import CustomSelect from '../layout/CustomSelect'
import CustomDropdown from '../layout/CustomDropdown'

function EditJob() {
  const handleSelectChange = (field, value) => {
    console.log(`${field}: ${value}`)
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { href: "/dashboard", isHome: true },
          { label: "Job Management", href: "/job-management" },
          { label: "10848299" },
        ]}
      />
      <div className="mx-auto bg-white rounded-lg shadow py-[20px] px-[10px] sm:p-[25px] md:p-[40px] md:pt-[28px] mt-[30px]">
        <h2 className="text-[22px] font-black text-primary mb-[20px]">
          Edit Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[18px]">
          <CustomSelect
            label="Name"
            options={["Vikas Sabharwal", "John Doe", "Jane Smith"]}
            defaultValue="Vikas Sabharwal"
            onChange={(value) => handleSelectChange('name', value)}
          />

          <Input
            label="Callsign"
            defaultValue="VIKAS"
          />

          <Input
            label="Docket"
            defaultValue="10848299"
          />

          <CustomSelect
            label="Tariff"
            options={["Delivery", "Express", "Standard", "Premium"]}
            defaultValue="Delivery"
            onChange={(value) => handleSelectChange('tariff', value)}
          />

          <Input
            label="Date"
            type="date"
            defaultValue="2025-11-03"
          />

          <Input
            label="Time"
            type="time"
            defaultValue="05:00"
          />

          <CustomSelect
            label="Pickup Location"
            options={["SLOUGH", "LONDON", "MANCHESTER", "BIRMINGHAM"]}
            defaultValue="SLOUGH"
            onChange={(value) => handleSelectChange('pickup', value)}
          />

          <CustomSelect
            label="Drop-off Location"
            options={["KIDLINGTON", "OXFORD", "CAMBRIDGE", "READING"]}
            defaultValue="KIDLINGTON"
            onChange={(value) => handleSelectChange('dropoff', value)}
          />
          
          <div className="md:col-span-2">
            <Input
              label="Driver Total"
              defaultValue="21.15"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-[40px]">
          <button className="bg-primary border border-primary hover:bg-primary/20 hover:text-primary duration-300 cursor-pointer text-white 2xl:text-[18px] text-sm font-semibold px-[25px] 2xl:py-[13px] py-[10px] rounded-[6px] min-w-[150px]">
            Post Job
          </button>
          <button className="bg-secondary border border-secondary hover:bg-secondary/20 hover:text-secondary duration-300 cursor-pointer text-white 2xl:text-[18px] text-sm font-semibold px-[25px] 2xl:py-[13px] py-[10px] rounded-[6px] min-w-[150px]">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditJob