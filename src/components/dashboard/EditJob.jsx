"use client"
import React from 'react'
import Breadcrumb from './Breadcrumb'
import Select from '../form/Select'
import Input from '../form/Input'

function EditJob() {
    return (
        <div>
            <Breadcrumb
                items={[
                    { href: "/dashboard", isHome: true },
                    { label: "Job Management", href: "/job-management" },
                    { label: "10848299" },
                ]}
            />

            <div className="mx-auto bg-white rounded-lg shadow  py-[20px] px-[10px]  sm:p-[25px]  md:p-[40px] md:pt-[28px] mt-[30px]">

                <h2 className="text-[22px] font-black text-primary mb-[20px]">
                    Edit Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[18px]">

                    <Select
                        label="Name"
                        options={["Vikas Sabharwal"]}
                    />

                    <Input
                        label="Callsign"
                        defaultValue="VIKAS"
                    />

                
                    <Input
                        label="Docket"
                        defaultValue="10848299"
                    />

                    <Select
                        label="Tariff"
                        options={["Delivery"]}
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

                   
                    <Select
                        label="Pickup Location"
                        options={["SLOUGH"]}
                    />

                    <Select
                        label="Drop-off Location"
                        options={["KIDLINGTON"]}
                    />                   
                    <div className="md:col-span-2">
                        <Input
                            label="Driver Total"
                            defaultValue="21.15"
                        />
                    </div>
                </div>                
                <div className="flex flex-col sm:flex-row  gap-4 mt-[40px]">
                    <button className="bg-primary text-white text-sm font-semibold px-[50px] py-[12px] rounded">
                        Post Job
                    </button>
                    <button className="bg-secondary text-white text-sm font-semibold px-[50px] py-[12px] rounded">
                        Cancel
                    </button>
                </div>
            </div>

        </div>
    )
}

export default EditJob