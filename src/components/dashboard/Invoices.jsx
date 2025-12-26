"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import PaidCustomDropdown from "../layout/PaidCustomDropdown";
import {
  fetchAllInvoices,
  getInvoicePdfUrl,
  updateInvoice,
} from "@/lib/api/invoice.api";
import Loader from "./Loader";
import { calculatePageNumbers } from "@/utils/helpers";

function Invoices() {
  const dateRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [fromDate, setFromDate] = useState(searchParams.get("from_date") || "");
  const [toDate, setToDate] = useState(searchParams.get("to_date") || "");

  const [downloadingId, setDownloadingId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Calculate pagination values
  const totalPages = useMemo(() => {
    return Math.ceil(filteredInvoices.length / limit) || 1;
  }, [filteredInvoices.length]);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedInvoices = useMemo(() => {
    return filteredInvoices.slice(startIndex, endIndex);
  }, [filteredInvoices, startIndex, endIndex]);

  const buildQueryString = useCallback(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    return params.toString();
  }, [searchTerm, fromDate, toDate]);

  const updateURL = useCallback(() => {
    const queryString = buildQueryString();
    const newURL = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newURL, { scroll: false });
  }, [pathname, router, buildQueryString]);

  const fetchInvoicesData = useCallback(async () => {
    try {
      setLoading(true);
      const queryString = buildQueryString();
      const response = await fetchAllInvoices(queryString);

      if (response.data.success) {
        setInvoices(response.data.data);
        setFilteredInvoices(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch invoices");
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error(error.response?.data?.message || "Failed to fetch invoices");
    } finally {
      setLoading(false);
    }
  }, [buildQueryString]);

  useEffect(() => {
    fetchInvoicesData();
  }, [fetchInvoicesData]);

  useEffect(() => {
    let result = [...invoices];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (invoice) =>
          invoice.driver?.name?.toLowerCase().includes(searchLower) ||
          invoice.driver?.call_sign?.toLowerCase().includes(searchLower) ||
          invoice.status?.toLowerCase().includes(searchLower) ||
          invoice.id?.toLowerCase().includes(searchLower)
      );
    }

    if (fromDate) {
      const from = new Date(fromDate);
      result = result.filter((invoice) => new Date(invoice.start_date) >= from);
    }

    if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      result = result.filter((invoice) => new Date(invoice.end_date) <= to);
    }

    setFilteredInvoices(result);
    setCurrentPage(1);
  }, [invoices, searchTerm, fromDate, toDate]);

  const handleSearch = () => {
    updateURL();
    fetchInvoicesData();
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFromDate("");
    setToDate("");
    router.push(pathname, { scroll: false });
    fetchInvoicesData();
  };

  // Updated to return a Promise for the dropdown to await
  const handleUpdatePaidStatus = async (invoiceId, isPaid) => {
    console.log(
      `Marking invoice ${invoiceId} as ${isPaid ? "Paid" : "Unpaid"}`
    );

    try {
      const response = await updateInvoice(invoiceId, { is_paid: isPaid });

      if (response.data.success) {
        toast.success(
          `Invoice marked as ${isPaid ? "Paid" : "Unpaid"} successfully`
        );

        // Update both invoices and filteredInvoices states
        setInvoices((prevInvoices) =>
          prevInvoices.map((invoice) =>
            invoice.id === invoiceId ? { ...invoice, is_paid: isPaid } : invoice
          )
        );

        setFilteredInvoices((prevFiltered) =>
          prevFiltered.map((invoice) =>
            invoice.id === invoiceId ? { ...invoice, is_paid: isPaid } : invoice
          )
        );

        return true; // Indicate success
      } else {
        toast.error(response.data.message || "Failed to update invoice status");
        throw new Error(
          response.data.message || "Failed to update invoice status"
        );
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast.error(
        error.response?.data?.message || "Failed to update invoice status"
      );
      throw error; // Re-throw so dropdown can handle it
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDownloadInvoice = async (invoiceId) => {
    try {
      setDownloadingId(invoiceId);
      const response = await getInvoicePdfUrl(invoiceId);

      if (response?.data?.success && response?.data?.statusCode === 200) {
        const pdfUrl = response.data.data.url;
        console.log("PDF URL:", pdfUrl);

        const newWindow = window.open(pdfUrl, "_blank");

        toast.success("Invoice PDF opened successfully");
        return true;
      } else {
        toast.error(response?.data?.message || "Failed to download invoice");
        throw new Error(
          response?.data?.message || "Failed to download invoice"
        );
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast.error(
        error?.response?.data?.message || "Failed to download invoice"
      );
      throw error;
    } finally {
      setDownloadingId(null);
    }
  };

  const getPageNumbers = () => calculatePageNumbers(totalPages, currentPage);

  return (
    <div>
      <section>
        {/* Filter Section */}
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-[20px] mb-6">
          <div className="flex flex-col items-start sm:flex-row sm:items-center flex-wrap xl:flex-nowrap gap-[20px] w-full xl:w-[70%]">
            <span className="text-[20px] font-bold">Filter:</span>

            {/* Date Range Filter */}
            <div className="flex w-full sm:w-[fit-content] flex-col sm:flex-row md:flex-nowrap flex-wrap items-center gap-[10px]">
              {/* <div className="relative w-full">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="py-[10px] 2xl:py-[15px] px-[16px] w-full sm:w-[155px] rounded-[6px] border border-[#22358114] focus-visible:!outline-0 duration-300 focus-visible:border-[#515151] text-[#B4B4B4] text-[16px] font-normal"
                />
                            </div> */}
              <div
                className="relative w-full sm:w-[155px]"
                onClick={() => dateRef.current?.showPicker()}
              >
                <input
                  ref={dateRef}
                  type="date"
                  className="
                                         w-full  px-[16px] pr-[42px] 2xl:py-[15px] py-[10px] rounded-[6px] border border-[#22358114] text-[#515151]
                                         text-[16px] font-normal focus:outline-none focus:border-[#515151]  appearance-none  "
                />
                <span className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2">
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.832 1.42737H13.3531V0.657207C13.3531 0.294267 13.0588 0 12.6958 0C12.3329 0 12.0386 0.294267 12.0386 0.657207V1.42737H7.04925V0.657207C7.04925 0.294267 6.75499 0 6.39205 0C6.02911 0 5.73484 0.294267 5.73484 0.657207V1.42737H3.25587C1.46042 1.42737 0 2.88796 0 4.6834V13.8874C0 15.6591 1.44117 17.1002 3.21255 17.1002H15.8753C17.6467 17.1002 19.0879 15.6591 19.0879 13.8874V4.6834C19.0879 2.88796 17.6275 1.42737 15.832 1.42737ZM3.25587 2.74179H5.73484V3.12318C5.73484 3.48612 6.02911 3.78039 6.39205 3.78039C6.75499 3.78039 7.04925 3.48612 7.04925 3.12318V2.74179H12.0386V3.12318C12.0386 3.48612 12.3329 3.78039 12.6958 3.78039C13.0588 3.78039 13.3531 3.48612 13.3531 3.12318V2.74179H15.832C16.9025 2.74179 17.7735 3.61271 17.7735 4.6834V5.30676H1.31441V4.6834C1.31441 3.61271 2.18534 2.74179 3.25587 2.74179ZM15.8753 15.7858H3.21255C2.16577 15.7858 1.31441 14.9341 1.31441 13.8874V6.62117H17.7735V13.8874C17.7735 14.9341 16.9221 15.7858 15.8753 15.7858Z"
                      fill="#515151"
                    />
                    <path
                      d="M5.15479 8.56584H4.17283C3.80989 8.56584 3.51562 8.86011 3.51562 9.22305C3.51562 9.58599 3.80989 9.88026 4.17283 9.88026H5.15479C5.51773 9.88026 5.812 9.58599 5.812 9.22305C5.812 8.86011 5.51773 8.56584 5.15479 8.56584Z"
                      fill="#515151"
                    />
                    <path
                      d="M10.0357 8.56584H9.05369C8.69075 8.56584 8.39648 8.86011 8.39648 9.22305C8.39648 9.58599 8.69075 9.88026 9.05369 9.88026H10.0357C10.3986 9.88026 10.6929 9.58599 10.6929 9.22305C10.6929 8.86011 10.3986 8.56584 10.0357 8.56584Z"
                      fill="#515151"
                    />
                    <path
                      d="M14.9146 8.56584H13.9326C13.5697 8.56584 13.2754 8.86011 13.2754 9.22305C13.2754 9.58599 13.5697 9.88026 13.9326 9.88026H14.9146C15.2775 9.88026 15.5718 9.58599 15.5718 9.22305C15.5718 8.86011 15.2775 8.56584 14.9146 8.56584Z"
                      fill="#515151"
                    />
                    <path
                      d="M5.15479 11.9369H4.17283C3.80989 11.9369 3.51562 12.2312 3.51562 12.5941C3.51562 12.9571 3.80989 13.2513 4.17283 13.2513H5.15479C5.51773 13.2513 5.812 12.9571 5.812 12.5941C5.812 12.2312 5.51773 11.9369 5.15479 11.9369Z"
                      fill="#515151"
                    />
                    <path
                      d="M10.0357 11.9369H9.05369C8.69075 11.9369 8.39648 12.2312 8.39648 12.5941C8.39648 12.9571 8.69075 13.2513 9.05369 13.2513H10.0357C10.3986 13.2513 10.6929 12.9571 10.6929 12.5941C10.6929 12.2312 10.3986 11.9369 10.0357 11.9369Z"
                      fill="#515151"
                    />
                    <path
                      d="M14.9146 11.9369H13.9326C13.5697 11.9369 13.2754 12.2312 13.2754 12.5941C13.2754 12.9571 13.5697 13.2513 13.9326 13.2513H14.9146C15.2775 13.2513 15.5718 12.9571 15.5718 12.5941C15.5718 12.2312 15.2775 11.9369 14.9146 11.9369Z"
                      fill="#515151"
                    />
                  </svg>
                </span>
              </div>

              <p className="text-[#515151]">To</p>

              <div className="relative w-full sm:w-[155px]">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="py-[10px] px-[16px] w-full sm:w-[155px] rounded-[6px] border border-[#22358114] focus-visible:!outline-0 duration-300 focus-visible:border-[#515151] text-[#B4B4B4] text-[16px] font-normal"
                />
              </div>
            </div>
            <div className="relative w-full sm:w-[155px]">
              <button
                onClick={handleClearFilters}
                className="whitespace-nowrap group flex justify-center items-center gap-[5px] rounded-[6px] bg-secondary border border-secondary hover:text-secondary hover:bg-secondary/20 duration-300 cursor-pointer w-full sm:w-[fit-content] min-w-[100px] px-[25px] py-[10px] text-sm font-semibold leading-normal text-white transition"
              >
                Clear Filter
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full 2xl:min-w-[400px] xl:!min-w-[300px]">
              <input
                type="text"
                placeholder="Search by name, callsign, status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="pl-[16px] pr-[60px] py-[10px] w-full rounded-md border border-[#22358114] focus-visible:!outline-0 duration-300 focus-visible:border-[#515151] text-[#515151] text-[16px] font-normal"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <svg
                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3 min-w-[1000px]">
            <thead className="text-[16px] md:text-[18px] lg:text-[20px] font-bold">
              <tr className="bg-gray-50">
                <th className="text-center px-[20px] py-[15px] 2xl:text-[20px] whitespace-nowrap rounded-l-[15px]">
                  #
                </th>
                <th className="text-left px-[20px] py-[15px] 2xl:text-[20px] whitespace-nowrap">
                  Invoice ID
                </th>
                <th className="text-left px-[20px] py-[15px] 2xl:text-[20px] whitespace-nowrap">
                  Driver
                </th>
                <th className="text-left px-[20px] py-[15px] 2xl:text-[20px] whitespace-nowrap">
                  Callsign
                </th>
                <th className="text-left px-[20px] py-[15px] 2xl:text-[20px] whitespace-nowrap">
                  Date Range
                </th>
                <th className="text-left px-[20px] py-[15px] 2xl:text-[20px] whitespace-nowrap">
                  Final Total
                </th>
                <th className="text-left px-[20px] py-[15px] 2xl:text-[20px] whitespace-nowrap">
                  Invoice Status
                </th>
                <th className="text-left px-[20px] py-[15px] 2xl:text-[20px] whitespace-nowrap">
                  Payment Status
                </th>
                <th className="text-center px-[20px] py-[15px] 2xl:text-[20px] whitespace-nowrap rounded-r-[15px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-[16px] text-[#515151]">
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-20">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader text="Loading invoices..." />
                    </div>
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-20">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <svg
                        className="w-16 h-16 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-gray-500 text-lg">No invoices found</p>
                      {(searchTerm || fromDate || toDate) && (
                        <button
                          onClick={handleClearFilters}
                          className="text-secondary hover:underline"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedInvoices.map((invoice, index) => (
                  <tr key={invoice.id} className="bg-white">
                    <td className="px-[20px] py-[20px] border-y border-[#22358114] border-l rounded-l-[15px] w-[100px] text-center">
                      {startIndex + index + 1}
                    </td>

                    <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap">
                      #{invoice.id}
                    </td>

                    <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap">
                      {invoice.driver?.name || "N/A"}
                    </td>

                    <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap">
                      {invoice.driver?.call_sign || "N/A"}
                    </td>

                    <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {formatDate(invoice.start_date)}
                        </span>
                        <span className="text-xs text-gray-400">to</span>
                        <span className="text-sm">
                          {formatDate(invoice.end_date)}
                        </span>
                      </div>
                    </td>

                    <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] whitespace-nowrap">
                      ${Number(invoice.final_total).toFixed(2)}
                    </td>

                    <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114]">
                      <span
                        className={`2xl:text-base text-sm font-medium ${
                          invoice.status !== "DRAFT"
                            ? "text-[#009249]"
                            : "text-[#C00000]"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>

                    <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114]">
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          invoice.is_paid === true
                            ? "text-[#009249] bg-[#009249]/10"
                            : "text-[#C00000] bg-[#C00000]/10"
                        }`}
                      >
                        {invoice.is_paid ? "Paid" : "Unpaid"}
                      </span>
                    </td>

                    <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] border-r rounded-r-[15px]">
                      <div className="flex items-center justify-center gap-2">
                        <PaidCustomDropdown
                          invoice={invoice}
                          onDownload={handleDownloadInvoice}
                          onStatusUpdate={(isPaid) =>
                            handleUpdatePaidStatus(invoice.id, isPaid)
                          }
                          isDownloading={downloadingId === invoice.id}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && filteredInvoices.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredInvoices.length)} of{" "}
              {filteredInvoices.length} entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`group px-3 border border-[#22358114] w-[40px] h-[40px] rounded-full text-sm duration-300 flex items-center justify-center ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-secondary hover:bg-secondary"
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
                    className={`${
                      currentPage === 1
                        ? "fill-gray-400 stroke-gray-400"
                        : "fill-[#C00000] stroke-[#C00000] group-hover:fill-white group-hover:stroke-white"
                    }`}
                  />
                </svg>
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page)
                  }
                  disabled={page === "..."}
                  className={`px-3 border w-[40px] h-[40px] rounded-full text-sm duration-300 ${
                    page === currentPage
                      ? "border-secondary bg-secondary text-white"
                      : page === "..."
                      ? "border-transparent cursor-default"
                      : "border-[#22358114] text-[#515151] hover:border-secondary hover:text-secondary"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`group px-3 border border-[#22358114] w-[40px] h-[40px] rounded-full text-sm duration-300 flex items-center justify-center ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-secondary hover:bg-secondary"
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
                    className={`${
                      currentPage === totalPages
                        ? "fill-gray-400 stroke-gray-400"
                        : "fill-[#C00000] stroke-[#C00000] group-hover:fill-white group-hover:stroke-white"
                    }`}
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Invoices;
