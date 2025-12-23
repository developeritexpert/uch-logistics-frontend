"use client";

import React, { useState, useEffect } from "react";
import CustomDropdown from "@/components/layout/CustomDropdown";
import Link from "next/link";
import { fetchAllDrivers } from "@/lib/api/driver.api";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import ConfirmModal from "./ConfirmModal";
import { handleDeleteDriver } from "@/utils/helpers";

function DriverProfilesPage() {
  const router = useRouter();

  const [statusFilter, setStatusFilter] = useState("All");
  const [positionFilter, setPositionFilter] = useState("All");
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [totalDrivers, setTotalDrivers] = useState(0);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    const loadDrivers = async () => {
      setLoading(true);
      try {
        const response = await fetchAllDrivers({
          limit: limit,
          page: currentPage,
          search: searchTerm,
        });
        console.log(response.data, "Derice");

        if (response.data.success && response.data.statusCode === 200) {
          setDrivers(response.data.data || []);
          setTotalPages(response.data.pagination.totalPages || 1);
          setTotalDrivers(response.data.pagination.totalCount || 0);
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch drivers.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      loadDrivers();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentPage, limit, searchTerm]);

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
   router.push(`/drivers/view/${driverId}`);
  };

  const handleEdit = (driverId, driverName) => {
    router.push(`/drivers/edit/${driverId}`);
  };

  const handleDelete = (driverId, driverName) => {
    setSelectedDriver({ id: driverId, name: driverName });
    setShowDeleteModal(true);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 border w-[40px] h-[40px] rounded-[50%] text-sm duration-300 ${
            currentPage === i
              ? "border-primary bg-primary text-white"
              : "border-[#22358114] text-[#515151] hover:border-primary hover:text-primary"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <section className="">
      <div className="flex flex-wrap sm:flex-nowrap  items-center gap-[30px] justify-between mb-6">
        <div className="relative lg:min-w-[450px] 2xl:min-w-[624px]">
          <input
            type="text"
            placeholder="Search with name, callsign, position etc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-[15px] pl-[20px] pr-[60px] border border-[#22358114] rounded-[6px] placeholder:text-[#B4B4B4] focus:outline-0 focus:border-[#515151] duration-300"
          />
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex gap-4">
          <Link
            href="/drivers/add"
            className="group flex items-center gap-[5px] bg-secondary border border-secondary hover:bg-secondary/20 min-w-[100px] hover:text-secondary duration-300 cursor-pointer rounded-[7px] px-[25px] 2xl:py-[13px] py-[10px] 2xl:text-[18px] font-bold text-sm text-white hover:bg-opacity-90 transition-colors"
          >
            <svg
              className="w-[15px] h-[15px] 2xl:w-[20px] 2xl:h-[27px]"
              width="24"
              height="27"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.375701 23.9555C0.718703 24.6317 1.27388 25.1769 1.95623 25.5076C2.00456 25.5332 2.05857 25.5559 2.10974 25.5787C4.01149 26.4315 7.2891 27 11.013 27C12.4513 26.9986 13.888 26.9036 15.314 26.7157C14.5295 26.0635 13.935 25.2123 13.5928 24.2513C13.2506 23.2902 13.1732 22.2548 13.3689 21.2536C13.5645 20.2524 14.026 19.3223 14.7048 18.5608C15.3836 17.7993 16.2548 17.2345 17.2271 16.9255C16.4283 16.5588 15.621 16.2063 14.8165 15.851C14.5816 15.7639 14.3774 15.6097 14.2293 15.4075C14.0813 15.2054 13.9958 14.9642 13.9836 14.7139C13.8926 13.9095 14.1911 13.2926 14.6857 12.6672C16.1953 10.8231 17.0181 8.51224 17.0139 6.12905C17.0281 2.4961 14.5294 -0.141903 10.8339 0.00591648C8.11347 0.10541 5.8308 1.93894 5.37029 4.62527C4.82449 7.73232 5.71709 10.4698 7.65012 12.8946C8.69622 14.2051 8.40911 15.3422 6.86554 16.0216C5.59496 16.5481 4.36046 17.1577 3.17005 17.8466C2.26835 18.3915 1.453 19.0679 0.750935 19.8535C0.353563 20.2932 0.0996987 20.8435 0.0232091 21.4312C-0.00390139 21.6245 -0.00390139 21.8206 0.0232091 22.0139C0.0055599 22.143 -0.00204341 22.2732 0.000467709 22.4034C4.39388e-06 22.9433 0.12866 23.4754 0.375701 23.9555Z"
                className="fill-white group-hover:fill-secondary duration-300"
              />
              <path
                d="M14.7083 23.6826C14.7935 23.9583 14.9059 24.225 15.0437 24.4785C15.1119 24.6036 15.1859 24.7258 15.2654 24.8424C15.5846 25.3146 15.9908 25.7217 16.4622 26.042C17.3151 26.6186 18.3423 26.8798 19.3671 26.7807C20.3918 26.6816 21.3499 26.2284 22.0765 25.4991C22.2779 25.2986 22.4588 25.0786 22.6166 24.8424C22.6962 24.7258 22.773 24.6036 22.8412 24.4785C22.9778 24.2244 23.0902 23.9579 23.1766 23.6826C23.3672 23.0726 23.4237 22.4286 23.3423 21.7948C23.2608 21.1609 23.0434 20.5522 22.7047 20.0102C22.3661 19.4682 21.9143 19.0058 21.3804 18.6547C20.8464 18.3036 20.2428 18.072 19.6111 17.9759C18.9793 17.8797 18.3341 17.9213 17.7199 18.0976C17.1057 18.274 16.5368 18.5811 16.0523 18.9978C15.5678 19.4145 15.179 19.931 14.9127 20.5119C14.6464 21.0929 14.5088 21.7245 14.5093 22.3636C14.5079 22.8108 14.5751 23.2556 14.7083 23.6826ZM16.2973 21.8434H18.4208V19.7227H19.4641V21.8434H21.5847V22.8838H19.4641V25.0044H18.4208V22.8838H16.2973V21.8434Z"
                className="fill-white group-hover:fill-secondary duration-300"
              />
            </svg>
            Add Driver
          </Link>
        </div>
      </div>

      <div className="w-full overflow-x-scroll">
        <table className="w-full border-separate border-spacing-y-3">
          <thead className="">
            <tr>
              <th className="text-left px-[20px] py-[10px] 2xl:text-[20px]">
                #
              </th>
              <th className="text-left px-[20px] py-[10px] 2xl:text-[20px]">
                Driver Name
              </th>
              <th className="text-left px-[20px] py-[10px] 2xl:text-[20px]">
                Callsign
              </th>
              <th className="text-left px-[20px] py-[10px] 2xl:text-[20px]">
                Position
              </th>
              <th className="text-left px-[20px] py-[10px] 2xl:text-[20px]">
                Status
              </th>
              <th className="text-left px-[20px] py-[10px] 2xl:text-[20px] !text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#515151]">
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Loader text="Fetching drivers..." />
                </td>
              </tr>
            ) : drivers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-20 text-gray-500">
                  No drivers found.
                </td>
              </tr>
            ) : (
              drivers.map((driver) => (
                <tr key={driver.id} className="bg-white">
                  <td className="px-[20px] py-[20px] border-y border-[#22358114] border-l rounded-l-[15px] w-[100px]">
                    {drivers.indexOf(driver) + 1}
                  </td>
                  <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap ">
                    {driver.name}
                  </td>
                  <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap">
                    {driver.call_sign}
                  </td>
                  <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap">
                    {driver.position}
                  </td>
                  <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap">
                    <span
                      className={`font-medium  ${
                        driver.status === "active"
                          ? "text-[#009249]"
                          : "text-[#C00000]"
                      }`}
                    >
                      {driver.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] border-r rounded-r-[15px]">
                    <div className="flex justify-center">
                      <CustomDropdown
                        driverId={driver.id}
                        driverName={driver.name}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * limit + 1} to{" "}
          {Math.min(currentPage * limit, totalDrivers)} of {totalDrivers}{" "}
          drivers
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`group px-3 border w-[40px] h-[40px] rounded-[50%] text-sm duration-300 flex items-center justify-center ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed border-[#22358114]"
                : "border-[#22358114] hover:border-secondary hover:bg-secondary"
            }`}
          >
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.63267 10.8552C5.58042 10.9109 5.50943 10.9424 5.43524 10.9428C5.39842 10.9432 5.36191 10.9356 5.32796 10.9205C5.29401 10.9055 5.26333 10.8832 5.2378 10.8552L0.582305 5.93362C0.556159 5.90634 0.5354 5.87384 0.52123 5.83801C0.507061 5.80219 0.499764 5.76374 0.499764 5.7249C0.499764 5.68607 0.507061 5.64762 0.52123 5.61179C0.5354 5.57596 0.556159 5.54346 0.582305 5.51618L5.2378 0.593579C5.2634 0.564651 5.29424 0.541462 5.32849 0.525392C5.36274 0.509323 5.3997 0.500701 5.43716 0.500041C5.47463 0.499381 5.51184 0.506695 5.54658 0.521548C5.58131 0.536402 5.61287 0.558491 5.63937 0.586502C5.66586 0.614512 5.68676 0.647871 5.70081 0.684594C5.71486 0.721316 5.72178 0.760652 5.72115 0.800259C5.72053 0.839866 5.71237 0.878936 5.69717 0.915143C5.68197 0.951349 5.66004 0.983954 5.63267 1.01101L1.17461 5.7249L5.63267 10.4377C5.6587 10.4651 5.67935 10.4976 5.69345 10.5334C5.70754 10.5693 5.7148 10.6077 5.7148 10.6465C5.7148 10.6853 5.70754 10.7237 5.69345 10.7595C5.67935 10.7953 5.6587 10.8278 5.63267 10.8552Z"
                className="fill-[#C00000] stroke-[#C00000] group-hover:fill-[#fff] group-hover:stroke-[#fff]"
              />
            </svg>
          </button>

          {renderPaginationButtons()}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`group px-3 border w-[40px] h-[40px] rounded-[50%] text-sm duration-300 flex items-center justify-center ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed border-[#22358114]"
                : "border-[#22358114] hover:border-secondary hover:bg-secondary"
            }`}
          >
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.58852 10.8552C0.640767 10.9109 0.711764 10.9424 0.785955 10.9428C0.822775 10.9432 0.859278 10.9356 0.893227 10.9205C0.927176 10.9055 0.957857 10.8832 0.983389 10.8552L5.63889 5.93362C5.66503 5.90634 5.68579 5.87384 5.69996 5.83801C5.71413 5.80219 5.72143 5.76374 5.72143 5.7249C5.72143 5.68607 5.71413 5.64762 5.69996 5.61179C5.68579 5.57596 5.66503 5.54346 5.63889 5.51618L0.983389 0.593579C0.957791 0.564651 0.926949 0.541462 0.892699 0.525392C0.85845 0.509323 0.821492 0.500701 0.784026 0.500041C0.74656 0.499381 0.709352 0.506695 0.674614 0.521548C0.639877 0.536402 0.608321 0.558491 0.581825 0.586502C0.555329 0.614512 0.534434 0.647871 0.520384 0.684594C0.506333 0.721316 0.499414 0.760652 0.500039 0.800259C0.500663 0.839866 0.508819 0.878936 0.52402 0.915143C0.53922 0.951349 0.561156 0.983954 0.58852 1.01101L5.04658 5.7249L0.58852 10.4377C0.562494 10.4651 0.541839 10.4976 0.527744 10.5334C0.51365 10.5693 0.506394 10.6077 0.506394 10.6465C0.506394 10.6853 0.51365 10.7237 0.527744 10.7595C0.541839 10.7953 0.562494 10.8278 0.58852 10.8552Z"
                className="fill-[#C00000] stroke-[#C00000] group-hover:fill-[#fff] group-hover:stroke-[#fff]"
              />
            </svg>
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Driver"
        description={`Are you sure you want to delete ${selectedDriver?.name}?`}
        confirmText="Delete"
        loading={deleteLoading}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() =>
          handleDeleteDriver({
            driverId: selectedDriver.id,
            driverName: selectedDriver.name,
            setLoading: setDeleteLoading,
            closeModal: () => setShowDeleteModal(false),
            onSuccess: (msg) => {
              setShowDeleteModal(false);
              setDrivers((prev) =>
                prev.filter((d) => d.id !== selectedDriver.id)
              );
            },
            onError: (msg) => {
              setShowDeleteModal(false);
            },
          })
        }
      />

    </section>
  );
}

export default DriverProfilesPage;
