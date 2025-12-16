"use client";

import React, { useState } from 'react';
import CustomDropdown from '@/components/layout/CustomDropdown';

const drivers = [
  {
    id: 1,
    driver: "Vikas Sabharwal",
    callsign: "Vikas",
    position: "Van Driver",
    status: "Active",
  },
  {
    id: 2,
    driver: "Andrei Toluntan",
    callsign: "XANDRETT",
    position: "Van Driver",
    status: "Inactive",
  },
  {
    id: 3,
    driver: "Catalin Constantin Potur",
    callsign: "CATALIN",
    position: "Class 1 Driver",
    status: "Active",
  },
  {
    id: 4,
    driver: "Georgian-Alin Iacob",
    callsign: "IACOB",
    position: "Class 1 Driver",
    status: "Active",
  },
  {
    id: 5,
    driver: "Mihai Gabriel Iacob",
    callsign: "MIHAI",
    position: "Class 1 Driver",
    status: "Inactive",
  },
  {
    id: 6,
    driver: "Charnjit Singh Sangha",
    callsign: "charan",
    position: "Class 1 Driver",
    status: "Active",
  },
  {
    id: 7,
    driver: "Bogdan Vasile Podariu",
    callsign: "XBOGDAN",
    position: "Class 2 Driver",
    status: "Active",
  },
  {
    id: 8,
    driver: "Alexandru Ionut Negru",
    callsign: "NEGRU",
    position: "Class 1 Driver",
    status: "Active",
  }
];

function DriverProfilesPage() {
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [positionFilter, setPositionFilter] = useState("All");

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
    <section className="p-6">
      <div className='flex items-center gap-[30px] justify-between mb-6'>
        <div className="relative ">
          <input
            type="text"
            placeholder="Search with name, callsign, position etc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-[10px] px-4 pr-12 border border-[#22358114] rounded-[6px] bg-white focus:outline-0"
          />
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex gap-4">
          <button className='bg-secondary rounded-[7px] px-[20px] py-[10px] text-sm text-white hover:bg-opacity-90 transition-colors'>
            Add New Driver
          </button>
        </div>
      </div>

      <table className='w-full border-separate border-spacing-y-3'>
        <thead className=''>
          <tr>
            <th className='text-left px-[20px] py-[10px]'></th>
            <th className='text-left px-[20px] py-[10px]'>Driver</th>
            <th className='text-left px-[20px] py-[10px]'>Callsign</th>
            <th className='text-left px-[20px] py-[10px]'>Position</th>
            <th className='text-left px-[20px] py-[10px]'>Status</th>
            <th className='text-left px-[20px] py-[10px] !text-center'>Actions</th>
          </tr>
        </thead>
        <tbody className='text-sm text-[#515151]'>
          {drivers.map((driver) => (
            <tr key={driver.id} className='bg-white'>
              <td className="px-[20px] py-[20px] border-y border-[#22358114] border-l rounded-l-[15px]">
                <div className='flex justify-center'>
                  <input type="checkbox" />
                </div>
              </td>
              <td className='px-[20px] py-[20px] border-y border-[#22358114]'>
                {driver.driver}
              </td>
              <td className='px-[20px] py-[20px] border-y border-[#22358114]'>
                {driver.callsign}
              </td>
              <td className='px-[20px] py-[20px] border-y border-[#22358114]'>
                {driver.position}
              </td>
              <td className='px-[20px] py-[20px] border-y border-[#22358114]'>
                <span className={`font-medium ${driver.status === 'Active' ? 'text-[#009249]' : 'text-[#C00000]'}`}>
                  {driver.status}
                </span>
              </td>
              <td className='px-[20px] py-[20px] border-y border-[#22358114] border-r rounded-r-[15px]'>
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

      <div className="flex items-center justify-center mt-8">
        <div className="flex gap-2">
          <button className="px-3 border border-[#22358114] hover:border-primary text-[#515151] hover:text-primary rounded-[50%] text-sm duration-300">
            Previous
          </button>
          <button className="px-3 border border-[#22358114] hover:border-primary text-[#515151] hover:text-primary rounded-[50%] text-sm duration-300">
            1
          </button>
          <button className="px-3 border border-[#22358114] hover:border-primary text-[#515151] hover:text-primary rounded-[50%] text-sm duration-300">
            2
          </button>
          <button className="px-3 border border-[#22358114] hover:border-primary text-[#515151] hover:text-primary rounded-[50%] text-sm duration-300">
            3
          </button>
          <button className="px-3 border border-[#22358114] hover:border-primary text-[#515151] hover:text-primary rounded-[50%] text-sm duration-300">
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default DriverProfilesPage;