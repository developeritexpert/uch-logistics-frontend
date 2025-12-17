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
            <th className='text-left px-[20px] py-[10px]'>Drivers</th>
            <th className='text-left px-[20px] py-[10px]'>Callsign</th>
            <th className='text-left px-[20px] py-[10px]'>Position</th>
            <th className='text-left px-[20px] py-[10px]'>Status</th>
            <th className='text-left px-[20px] py-[10px] !text-center'>Actions</th>
          </tr>
        </thead>
        <tbody className='text-sm text-[#515151]'>
          {drivers.map((driver) => (
            <tr key={driver.id} className='bg-white'>
              <td className="px-[20px] py-[20px] border-y border-[#22358114] border-l rounded-l-[15px] w-[100px]">

                {/* <div className='flex justify-center'>
                  <input type="checkbox" />
                </div> */}
                <label className="group  cursor-pointer select-none">
                  
                  <input
                    type="checkbox"
                    className="hidden"
                  />             
                  <span
                    className="w-[30px] h-[30px] rounded-[4px] border border-[#D1D5DB] flex items-center justify-center transition-all
                                                 group-has-[:checked]:border-[#1E3A8A]
                                                 group-has-[:checked]:bg-[#1E3A8A]">
                    <svg
                      className="w-4 h-4
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
  )
}

export default DriverProfilesPage;