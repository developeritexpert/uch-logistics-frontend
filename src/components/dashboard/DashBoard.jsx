"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CustomDropdown from "@/components/layout/CustomDropdown";
import { fetchDashboardData } from "@/lib/api/dashboard.api";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const router = useRouter();

  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetchDashboardData();
        setDashboard(res.data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          router.replace("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  if (loading) {
    return <p className="text-center">Loading dashboard...</p>;
  }

  const drivers = dashboard?.recent_active_drivers || [];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDrivers(drivers.map((driver) => driver.id));
    } else {
      setSelectedDrivers([]);
    }
  };

  const handleSelectDriver = (driverId) => {
    if (selectedDrivers.includes(driverId)) {
      setSelectedDrivers(selectedDrivers.filter((id) => id !== driverId));
    } else {
      setSelectedDrivers([...selectedDrivers, driverId]);
    }
  };

  const handleView = (driverId, driverName) => {
    router.push(`/drivers/${driverId}`);
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
    <section>
      <div className="flex flex-wrap lg:flex-nowrap  items-stretch justify-between gap-[20px] lg:gap-[30px]">
        <div className="basis-[100%] sm:basis-[48%] lg:basis-[33%] flex justify-between items-end gap-[30px] border border-[#22358114] bg-white rounded-[15px] p-[20px]">
          <Image
            alt="Total Jobs Listed"
            src="/icons/total-jobs-listed.png"
            height={100}
            width={100}
            className="w-[60px]"
          />
          <div className="text-right">
            <p className="text-[#515151] md:text-[18px]">Total Jobs Listed</p>
            <span className="block text-primary text-[22px] md:text-[24px] lg:text-[30px] xl:text-[35px] font-black">
              {dashboard?.total_jobs ?? 0}
            </span>
          </div>
        </div>
        <div className="basis-[100%] sm:basis-[48%] lg:basis-[33%] flex justify-between items-end gap-[30px] border border-[#22358114] bg-white rounded-[15px] p-[20px]">
          <Image
            alt="Total Active Drivers"
            src="/icons/active-drivers.png"
            height={100}
            width={100}
            className="w-[60px]"
          />
          <div className="text-right">
            <p className="text-[#515151] md:text-[18px]">Active Drivers</p>
            <span className="block text-primary text-[22px] md:text-[24px] lg:text-[30px] xl:text-[35px] font-black">
              {dashboard?.active_drivers ?? 0}
            </span>
          </div>
        </div>
        <div className="basis-[100%] sm:basis-[48%] lg:basis-[33%] flex justify-between items-end gap-[30px] border border-[#22358114] bg-white rounded-[15px] p-[20px]">
          <Image
            alt="Total Revenue"
            src="/icons/total-revenue.png"
            height={100}
            width={100}
            className="w-[60px]"
          />
          <div className="text-right">
            <p className="text-[#515151] md:text-[18px]">Total Revenue</p>
            <span className="block text-primary text-[22px] md:text-[24px] lg:text-[30px] xl:text-[35px] font-black">
              ${dashboard?.total_revenue ?? 0}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-[20px]  md:gap-[30px] justify-between mt-[30px] sm:mt-[35px] md:mt-[50px] mb-[20px]">
        <h2 className=" text-[22px] md:text-[24px] lg:text-[30px] text-primary font-bold">
          Recent Active Drivers
        </h2>
        <Link href="/drivers" className="bg-secondary hover:bg-secondary/20 cursor-pointer border border-secondary rounded-[7px] px-[25px] min-w-[100px] py-[10px] hover:text-secondary duration-300 font-semibold text-sm text-white">
          View All Drivers
        </Link>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th></th>
              <th className="text-left px-[20px] py-[5px]">Driver</th>
              <th className="text-left px-[20px] py-[5px]">Callsign</th>
              <th className="text-left px-[20px] py-[5px]">Position</th>
              <th className="text-left px-[20px] py-[5px] whitespace-nowrap">
                Status
              </th>
              <th className="text-left px-[20px] py-[5px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {drivers.length > 0 ? (
              drivers.map((items) => (
                <tr key={items.id} className="text-[#515151] bg-white">
                  <td className="px-[20px] py-[20px] border-y border-[#22358114] border-l rounded-l-[15px]">
                    <label className="group cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedDrivers.includes(items.id)}
                        onChange={() => handleSelectDriver(items.id)}
                      />
                      <span
                        className="w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] rounded-[4px] border border-[#D1D5DB] flex items-center justify-center transition-all
                                                 group-has-[:checked]:border-[#1E3A8A]
                                                 group-has-[:checked]:bg-[#1E3A8A]"
                      >
                        <svg
                          className="w-3 h-3 lg:w-4 lg:h-4 
                                                    opacity-0 transition group-has-[:checked]:opacity-100"
                          viewBox="0 0 12 10"
                          fill="none"
                        >
                          <path
                            d="M1 5L4.5 8.5L11 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </label>
                  </td>
                  <td className="px-[20px] py-[20px] border-y border-[#22358114] whitespace-nowrap">
                    {items.name}
                  </td>
                  <td className="px-[20px] py-[20px] border-y border-[#22358114] whitespace-nowrap">
                    {items.call_sign}
                  </td>
                  <td className="px-[20px] py-[20px] border-y border-[#22358114] whitespace-nowrap">
                    {items.position}
                  </td>
                  <td className="px-[20px] py-[20px] border-y border-[#22358114] whitespace-nowrap">
                    <span
                      className={`font-medium ${
                        items.status === "active"
                          ? "text-[#009249]"
                          : "text-[#C00000]"
                      }`}
                    >
                      {items.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-[20px] py-[20px] border-y border-[#22358114] border-r rounded-r-[15px]">
                    <div className="flex justify-center">
                      <CustomDropdown
                        driverId={items.id}
                        driverName={items.name}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No drivers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Page;
