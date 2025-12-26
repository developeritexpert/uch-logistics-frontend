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

          {/* <Input
            label="Date"
            type="date"
            defaultValue="2025-11-03"
          /> */}

          <div className="relative w-full">
            <Input
              label="Date"
              type="date"
              defaultValue="2025-11-03"
              className="
      w-full
      px-[16px]
      pr-[44px]     /* space for icon */
      py-[10px]
      2xl:py-[15px]
      rounded-[6px]
      border border-[#22358114]
      text-[#515151]
      text-[16px]
      font-normal
      focus:outline-none
      focus:border-[#515151]
      appearance-none   
      cursor-pointer
    "
            />

            {/* Calendar Icon */}
            <span className="pointer-events-none absolute right-[14px] top-[50%] -translate-y-[-50%]">
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.832 1.42737H13.3531V0.657207C13.3531 0.294267 13.0588 0 12.6958 0C12.3329 0 12.0386 0.294267 12.0386 0.657207V1.42737H7.04925V0.657207C7.04925 0.294267 6.75499 0 6.39205 0C6.02911 0 5.73484 0.294267 5.73484 0.657207V1.42737H3.25587C1.46042 1.42737 0 2.88796 0 4.6834V13.8874C0 15.6591 1.44117 17.1002 3.21255 17.1002H15.8753C17.6467 17.1002 19.0879 15.6591 19.0879 13.8874V4.6834C19.0879 2.88796 17.6275 1.42737 15.832 1.42737ZM3.25587 2.74179H5.73484V3.12318C5.73484 3.48612 6.02911 3.78039 6.39205 3.78039C6.75499 3.78039 7.04925 3.48612 7.04925 3.12318V2.74179H12.0386V3.12318C12.0386 3.48612 12.3329 3.78039 12.6958 3.78039C13.0588 3.78039 13.3531 3.48612 13.3531 3.12318V2.74179H15.832C16.9025 2.74179 17.7735 3.61271 17.7735 4.6834V5.30676H1.31441V4.6834C1.31441 3.61271 2.18534 2.74179 3.25587 2.74179ZM15.8753 15.7858H3.21255C2.16577 15.7858 1.31441 14.9341 1.31441 13.8874V6.62117H17.7735V13.8874C17.7735 14.9341 16.9221 15.7858 15.8753 15.7858Z" fill="#515151" />
                <path d="M5.15479 8.56586H4.17283C3.80989 8.56586 3.51562 8.86012 3.51562 9.22306C3.51562 9.586 3.80989 9.88027 4.17283 9.88027H5.15479C5.51773 9.88027 5.812 9.586 5.812 9.22306C5.812 8.86012 5.51773 8.56586 5.15479 8.56586Z" fill="#515151" />
                <path d="M10.0357 8.56592H9.05369C8.69075 8.56592 8.39648 8.86019 8.39648 9.22313C8.39648 9.58607 8.69075 9.88033 9.05369 9.88033H10.0357C10.3986 9.88033 10.6929 9.58607 10.6929 9.22313C10.6929 8.86019 10.3986 8.56592 10.0357 8.56592Z" fill="#515151" />
                <path d="M14.9146 8.56592H13.9326C13.5697 8.56592 13.2754 8.86019 13.2754 9.22313C13.2754 9.58607 13.5697 9.88033 13.9326 9.88033H14.9146C15.2775 9.88033 15.5718 9.58607 15.5718 9.22313C15.5718 8.86019 15.2775 8.56592 14.9146 8.56592Z" fill="#515151" />
                <path d="M5.15479 11.937H4.17283C3.80989 11.937 3.51562 12.2312 3.51562 12.5942C3.51562 12.9571 3.80989 13.2514 4.17283 13.2514H5.15479C5.51773 13.2514 5.812 12.9571 5.812 12.5942C5.812 12.2312 5.51773 11.937 5.15479 11.937Z" fill="#515151" />
                <path d="M10.0357 11.937H9.05369C8.69075 11.937 8.39648 12.2313 8.39648 12.5942C8.39648 12.9572 8.69075 13.2514 9.05369 13.2514H10.0357C10.3986 13.2514 10.6929 12.9572 10.6929 12.5942C10.6929 12.2313 10.3986 11.937 10.0357 11.937Z" fill="#515151" />
                <path d="M14.9146 11.937H13.9326C13.5697 11.937 13.2754 12.2313 13.2754 12.5942C13.2754 12.9572 13.5697 13.2514 13.9326 13.2514H14.9146C15.2775 13.2514 15.5718 12.9572 15.5718 12.5942C15.5718 12.2313 15.2775 11.937 14.9146 11.937Z" fill="#515151" />
              </svg>

            </span>
          </div>







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