"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import PaidCustomDropdown from "../layout/PaidCustomDropdown";
import {
  fetchAllInvoices,
  getInvoicePdfUrl,
  updateInvoice,
  fetchSingleInvoice,
} from "@/lib/api/invoice.api";
import Loader from "./Loader";
import { calculatePageNumbers } from "@/utils/helpers";

// Invoice Preview Modal Component - Exact HTML Template Design
const InvoicePreviewModal = ({ isOpen, onClose, invoice, loading }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return (
      <>
        {day}/{month}/{year} &nbsp;&nbsp;{hours}:{minutes}
      </>
    );
  };

  const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    return num.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatNegativeCurrency = (amount) => {
    const num = Number(amount) || 0;
    if (num === 0) return "";
    return `-${formatCurrency(num)}`;
  };

  // Calculate totals
  const calculateTotalDeductions = () => {
    if (!invoice) return 0;
    return (
      (Number(invoice.admin_fee) || 0) +
      (Number(invoice.vehicle_hire_charges) || 0) +
      (Number(invoice.insurance_charge) || 0) +
      (Number(invoice.fuel_charge) || 0) +
      (Number(invoice.additional_charges) || 0)
    );
  };

  const calculateVatAmount = () => {
    if (!invoice) return 0;
    const adminFee = Number(invoice.admin_fee) || 0;
    return adminFee * 0.2;
  };

  const calculateAdjustmentTotal = () => {
    return calculateTotalDeductions() + calculateVatAmount();
  };

  // Parse address into lines
  const parseAddress = (address) => {
    if (!address) return [];
    return address.split(",").map((line) => line.trim());
  };

  // Calculate total pages based on jobs
  const jobsPerPage = 10;
  const totalPages = invoice?.jobs
    ? Math.ceil(invoice.jobs.length / jobsPerPage)
    : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-[1400px] max-h-[95vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-[#223581] text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-xl font-bold">Invoice Preview</h2>
            {invoice && (
              <span className="text-sm opacity-80">
                #{invoice.id}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Invoice Content - Scrollable */}
        <div
          className="flex-1 overflow-y-auto bg-gray-200"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader text="Loading invoice details..." />
            </div>
          ) : invoice ? (
            <div className="bg-white mx-auto my-6 shadow-2xl max-w-[1200px]">
              {/* ==================== HEADER SECTION ==================== */}
              <section className="relative  overflow-hidden bg-white h-[490px] md:h-[400px]  xl:h-[450px]">
                {/* Red Shade Image */}
                <img
                  src="/img/red-shade.png"
                  alt=""
                  className="absolute -top-[20px] lg:-top-[29px] h-[150px] lg:h-auto w-full left-[80px] lg:left-[133px] "
                />

                {/* Blue Shade Image */}
                <img
                  src="/img/blue-shades.png"
                  alt=""
                  className="absolute z-10 w-full h-[150px] lg:h-auto   "
                />

                <img
                  src="/img/logoi.png"
                  alt="UCH Logistics"
                  className="absolute z-20 w-[150px] lg:h-auto   md:w-[200px]  top-[20px] left-[10px] lg:top-[30px] lg:left-[30px] xl:w-[250px] xl:top-[50px] xl:right-[80px]"
                />

                {/* Company Info */}
                <div className="max-w-[420px] text-black absolute right-[0] lg:right-10 top-40 md:top-20 ">
  <h3 className="text-[22px] font-bold text-[#223581] mb-[2px] mt-0">
    UCH Logistics Address:
  </h3>
  <p className="text-[18px] mb-[3px] max-w-[252px] leading-[1.5] mt-0">
    Colnbrook Cargo Centre, Old Bath Road, Colnbrook, SL3 0NW.
  </p>

  <h3 className="text-[22px] font-bold text-[#223581] mb-[2px] mt-0">
    Telephone:
  </h3>
  <p className="text-[18px] mb-[3px] mt-0">+44 (0) 1784 242 824</p>

  <h3 className="text-[22px] font-bold text-[#223581] mb-[2px] mt-0">
    Fax:
  </h3>
  <p className="text-[18px] mb-[3px] mt-0">+44 (0) 1784 245 222</p>

  <h3 className="text-[22px] font-bold text-[#223581] mb-[2px] mt-0">
    Email:
  </h3>
  <p className="text-[18px] m-0">info@uchlogistics.co.uk</p>
</div>


              </section>

            
              {/* ==================== TO/FROM SECTION ==================== */}
              <section className=" py-[40px] md:py-[20px] lg:py-[1px]  sm:pb-[80px] lg:pb-[90px] px-4 sm:px-6 lg:px-10 xl:px-[40px]">
                <div
                  className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-[70px] max-w-[1980px] mx-auto border-t sm:pt-[30px] sm:pt-[40px] lg:pt-[50px]"
                  style={{ borderColor: "#22358114" }}
                >
                  {/* TO Section */}
                  <div className="flex-1">
                    <div
                      className="w-full sm:w-fit border border-dashed rounded-[10px] flex gap-[10px] text-[18px] sm:text-[20px] lg:text-[22px]"
                      style={{ borderColor: "#2235811A", padding: "28px 30px 30px 30px", minWidth: "260px" }}
                    >
                      <h3 className="m-0 font-black text-[#223581]">To:</h3>
                      <ul className="list-none p-0 m-0 text-[#515151] flex flex-col gap-[6px] sm:gap-[7px]">
                        <li className="font-extrabold">UCH Logistics Ltd</li>
                        <li className="font-normal">Colnbrook Cargo Centre</li>
                        <li className="font-normal">Old Bath Road</li>
                        <li className="font-normal">Colnbrook</li>
                        <li className="font-normal">Slough</li>
                        <li className="font-normal">SL3 0NW</li>
                        <li className="font-normal">+44 (0)1784 242824</li>
                      </ul>
                    </div>
                  </div>

                  {/* FROM & DRIVER INFO Section */}
                  <div className="flex-1 flex flex-col sm:flex-row gap-6 lg:gap-[40px] xl:gap-[70px]">
                    {/* FROM */}
                    <div
                      className="w-full sm:w-fit border border-dashed rounded-[10px] flex gap-[10px] text-[18px] sm:text-[20px] lg:text-[22px]"
                      style={{ borderColor: "#2235811A", padding: "28px 30px 30px 30px", minWidth: "260px" }}
                    >
                      <h3 className="m-0 font-black text-[#223581]">From:</h3>
                      <ul className="list-none p-0 m-0 font-normal text-[#515151] flex flex-col gap-[6px] sm:gap-[7px]">
                        <li>{invoice.driver?.name || "N/A"}</li>
                        {parseAddress(invoice.driver?.address_details).map(
                          (line, idx) => (
                            <li key={idx}>{line}</li>
                          )
                        )}
                        {invoice.driver?.zip_code && (
                          <li>{invoice.driver.zip_code}</li>
                        )}
                        {invoice.driver?.phone_number && (
                          <li>{invoice.driver.phone_number}</li>
                        )}
                      </ul>
                    </div>

                    {/* DRIVER INFO BOX */}
                    <div
                      className="w-full sm:flex-1 lg:max-w-[420px] border border-dashed rounded-[10px] box-border"
                      style={{ borderColor: "#2235811A", padding: "28px 30px 30px 30px" }}
                    >
                      <div className="flex flex-wrap gap-2 mb-[14px] sm:mb-[16px] lg:mb-[18px]">
                        <div className="w-[150px] sm:w-[160px] lg:w-[170px] font-black text-[#223581] text-[16px] sm:text-[17px] lg:text-[18px]">
                          Driver Callsign:
                        </div>
                        <div className="text-[20px] sm:text-[21px] lg:text-[22px] font-normal text-[#515151]">
                          {invoice.driver?.call_sign || "N/A"}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-[14px] sm:mb-[16px] lg:mb-[18px]">
                        <div className="w-[150px] sm:w-[160px] lg:w-[170px] font-black text-[#223581] text-[16px] sm:text-[17px] lg:text-[18px]">
                          Self Bill Date:
                        </div>
                        <div className="text-[20px] sm:text-[21px] lg:text-[22px] font-normal text-[#515151]">
                          {formatDate(invoice.created_at)}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-[18px] sm:mb-[22px] lg:mb-[26px]">
                        <div className="w-[150px] sm:w-[160px] lg:w-[170px] font-black text-[#223581] text-[16px] sm:text-[17px] lg:text-[18px]">
                          Self Bill Number:
                        </div>
                        <div className="text-[20px] sm:text-[21px] lg:text-[22px] font-normal text-[#515151] leading-[1.5]">
                          {invoice.id?.slice(-6) || "N/A"} <br />
                          Page 1 of {totalPages}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <div className="w-[150px] sm:w-[160px] lg:w-[170px] font-black text-[#223581] text-[16px] sm:text-[17px] lg:text-[18px]">
                          Period:
                        </div>
                        <div className="text-[20px] sm:text-[21px] lg:text-[22px] font-normal text-[#515151]">
                          {formatDate(invoice.start_date)} -{" "}
                          {formatDate(invoice.end_date)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ==================== JOBS TABLE SECTION ==================== */}
              <section className="pb-[120px] sm:pb-[140px] lg:pb-[180px] overflow-x-auto px-4 sm:px-6 lg:px-10 xl:px-[40px]">
                <div className="max-w-[1980px] mx-auto  ">
                  <table
                    className="w-full text-[13px]"
                    style={{ borderCollapse: "collapse" }}
                  >
                    <thead>
                      <tr className="bg-[#223581] text-white text-[26px] font-black text-nowrap">
                        <th className="py-[20px] sm:py-[24px] lg:py-[30px] px-[20px] sm:px-[32px] lg:px-[50px] text-left">
                          Docket No.
                        </th>
                        <th className="py-[20px] sm:py-[24px] lg:py-[30px] px-[16px] sm:px-[28px] lg:px-[40px] text-left">
                          Pickup Date/Time
                        </th>
                        <th className="py-[20px] sm:py-[24px] lg:py-[30px] px-[16px] sm:px-[28px] lg:px-[40px] text-left">
                          Tariff
                        </th>
                        <th className="py-[20px] sm:py-[24px] lg:py-[30px] px-[16px] sm:px-[28px] lg:px-[40px] text-left">
                          Journey Details
                        </th>
                        <th className="py-[20px] sm:py-[24px] lg:py-[30px] px-[16px] sm:px-[28px] lg:px-[40px] text-left min-w-[200px] sm:min-w-[220px] lg:min-w-[250px]">
                          Amount
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[#515151]">
                      {invoice.jobs && invoice.jobs.length > 0 ? (
                        invoice.jobs.map((job, index) => (
                          <tr
                            key={job.id || index}
                            className="text-[22px] font-normal"
                            style={{ borderBottom: "1px solid #E6E9F5" }}
                          >
                            <td
                              className="py-[18px] sm:py-[22px] lg:py-[30px] px-[20px] sm:px-[32px] lg:px-[50px]"
                              style={{ border: "1px solid #22358114" }}
                            >
                              {job.docket_no || "N/A"}
                            </td>
                            <td
                              className="py-[18px] sm:py-[22px] lg:py-[30px] px-[16px] sm:px-[28px] lg:px-[40px]"
                              style={{ border: "1px solid #22358114" }}
                            >
                              {formatDateTime(job.date_time)}
                            </td>
                            <td
                              className="py-[18px] sm:py-[22px] lg:py-[30px] px-[16px] sm:px-[28px] lg:px-[40px]"
                              style={{ border: "1px solid #22358114" }}
                            >
                              {job.tariff || "N/A"}
                            </td>
                            <td
                              className="py-[18px] sm:py-[22px] lg:py-[30px] px-[16px] sm:px-[28px] lg:px-[40px]"
                              style={{ border: "1px solid #22358114" }}
                            >
                              {job.journey || "N/A"}
                            </td>
                            <td
                              className="py-[18px] sm:py-[22px] lg:py-[30px] px-[16px] sm:px-[28px] lg:px-[40px]"
                              style={{ border: "1px solid #22358114" }}
                            >
                              {formatCurrency(job.driver_total)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="py-[60px] text-center text-gray-400 text-[20px]"
                          >
                            No jobs found for this invoice
                          </td>
                        </tr>
                      )}
                    </tbody>

                    <tfoot>
                      <tr className="bg-[#BF0000] text-white text-[26px] font-black">
                        <td
                          className="py-[20px] sm:py-[24px] lg:py-[30px] px-[20px] sm:px-[32px] lg:px-[50px]"
                          colSpan="4"
                          align="right"
                        >
                          Carried Forward
                        </td>
                        <td className="py-[20px] sm:py-[24px] lg:py-[30px] px-[16px] sm:px-[28px] lg:px-[40px] text-left">
                          {formatCurrency(invoice.docket_total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>

              {/* ==================== PAY ADJUSTMENT SECTION ==================== */}
              <section className="mt-[40px] sm:mt-[50px] lg:mt-[60px] pb-[100px] sm:pb-[120px] lg:pb-[150px] px-4 sm:px-6 lg:px-10 xl:px-[40px]">
                <div className="w-full max-w-[1980px] mx-auto bg-white text-[#515151]">
                  {/* Summary Header */}
                  <div
                    className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center py-[20px] sm:py-[24px] lg:py-[30px] px-[20px] sm:px-[32px] lg:px-[60px] text-[20px] sm:text-[22px] lg:text-[26px] font-semibold"
                    style={{ backgroundColor: "#2235810A" }}
                  >
                    <div className="text-black">
                      Number of Dockets:{" "}
                      <span className="text-[#223581]">
                        {invoice.total_number_of_dockets || 0}
                      </span>
                    </div>
                    <div className="text-black">
                      Docket Total:{" "}
                      <span className="text-[#223581]">
                        {formatCurrency(invoice.docket_total)}
                      </span>
                    </div>
                  </div>

                  {/* Pay Adjustment Detail */}
                  <div className="py-[20px] sm:py-[24px] lg:py-[30px] px-[20px] sm:px-[32px] lg:px-[60px] lg:pr-[45px]">
                    <h3 className="m-0 mb-[20px] sm:mb-[24px] lg:mb-[30px] text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-black">
                      Pay Adjustment Detail
                    </h3>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                      {/* Left - Adjustments Table */}
                      <div className="flex-1">
                        {/* Table Header */}
                        <div
                          className="flex text-[16px] sm:text-[18px] lg:text-[20px] text-[#777] pb-[16px] sm:pb-[18px] lg:pb-[20px]"
                          style={{ borderBottom: "1px dashed #22358114" }}
                        >
                          <div className="w-[80%]">Description</div>
                          <div className="w-[10%] text-right">Value</div>
                          <div className="w-[10%] text-right">VAT</div>
                        </div>

                        {/* Admin Fee Row */}
                        <div
                          className="flex text-[18px] sm:text-[20px] lg:text-[22px] py-[16px] sm:py-[18px] lg:py-[20px]"
                          style={{ borderBottom: "1px dashed #22358114" }}
                        >
                          <div className="w-[80%]">Admin Fee</div>
                          <div className="w-[10%] text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-right">
                            {Number(invoice.admin_fee) > 0
                              ? formatNegativeCurrency(invoice.admin_fee)
                              : ""}
                          </div>
                          <div className="w-[10%] text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-right">
                            {Number(invoice.admin_fee) > 0 ? "+20.00%" : ""}
                          </div>
                        </div>

                        {/* Vehicle Hire Row */}
                        <div
                          className="flex text-[18px] sm:text-[20px] lg:text-[22px] py-[16px] sm:py-[18px] lg:py-[20px]"
                          style={{ borderBottom: "1px dashed #22358114" }}
                        >
                          <div className="w-[80%]">Vehicle Hire charges</div>
                          <div className="w-[10%] text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-right">
                            {Number(invoice.vehicle_hire_charges) > 0
                              ? formatNegativeCurrency(
                                invoice.vehicle_hire_charges
                              )
                              : ""}
                          </div>
                          <div className="w-[10%] text-[20px] font-normal text-right">
                            &nbsp;
                          </div>
                        </div>

                        {/* Insurance Row */}
                        <div
                          className="flex text-[18px] sm:text-[20px] lg:text-[22px] py-[16px] sm:py-[18px] lg:py-[20px]"
                          style={{ borderBottom: "1px dashed #22358114" }}
                        >
                          <div className="w-[80%]">Insurance charge</div>
                          <div className="w-[10%] text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-right">
                            {Number(invoice.insurance_charge) > 0
                              ? formatNegativeCurrency(invoice.insurance_charge)
                              : ""}
                          </div>
                          <div className="w-[10%] text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-right">
                            &nbsp;
                          </div>
                        </div>

                        {/* Fuel Row */}
                        <div
                          className="flex text-[18px] sm:text-[20px] lg:text-[22px] py-[16px] sm:py-[18px] lg:py-[20px]"
                          style={{ borderBottom: "1px dashed #22358114" }}
                        >
                          <div className="w-[80%]">Fuel charge</div>
                          <div className="w-[10%] text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-right">
                            {Number(invoice.fuel_charge) > 0
                              ? formatNegativeCurrency(invoice.fuel_charge)
                              : ""}
                          </div>
                          <div className="w-[10%] text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-right">
                            {Number(invoice.fuel_charge) > 0 ? "-" : ""}
                          </div>
                        </div>

                        {/* Additional Charges Row */}
                        <div
                          className="flex text-[18px] sm:text-[20px] lg:text-[22px] py-[16px] sm:py-[18px] lg:py-[20px]"
                          style={{ borderBottom: "1px dashed #22358114" }}
                        >
                          <div className="w-[80%]">Any additional charges</div>
                          <div className="w-[10%] text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-right">
                            {Number(invoice.additional_charges) > 0
                              ? formatNegativeCurrency(
                                invoice.additional_charges
                              )
                              : ""}
                          </div>
                          <div className="w-[10%] text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-right">
                            &nbsp;
                          </div>
                        </div>

                        {/* Total Row */}
                        <div className="flex pt-[16px] sm:pt-[18px] lg:pt-[20px] font-semibold">
                          <div className="w-[80%] text-[20px] sm:text-[22px] lg:text-[24px]">
                            Total
                          </div>
                          <div className="w-[10%] text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-right">
                            {calculateTotalDeductions() > 0
                              ? `-${formatCurrency(calculateTotalDeductions())}`
                              : ""}
                          </div>
                          <div className="w-[10%] text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-right">
                            {calculateVatAmount() > 0
                              ? `-${formatCurrency(calculateVatAmount())}`
                              : ""}
                          </div>
                        </div>
                      </div>

                      {/* Right - Adjustment Total */}
                      <div className="flex-1 flex mt-6 lg:mt-0">
                        <div className="flex-1 flex items-end justify-end text-[22px] sm:text-[23px] lg:text-[24px] font-semibold">
                          Adjustment Total:
                        </div>
                        <div className="flex-1 flex items-end justify-end text-[18px] sm:text-[19px] lg:text-[20px] font-normal">
                          {calculateAdjustmentTotal() > 0
                            ? `-${formatCurrency(calculateAdjustmentTotal())}`
                            : "0.00"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Footer */}
                  <div
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between items-start sm:items-center py-[20px] sm:py-[24px] lg:py-[30px] px-[20px] sm:px-[32px] lg:px-[60px]"
                    style={{ backgroundColor: "#2235810A" }}
                  >
                    <div className="text-[18px] sm:text-[20px] lg:text-[22px] text-[#223581] font-bold flex-1">
                      Please call 01753 336540 with any queries
                    </div>

                    <div className="flex-1 flex text-[18px] sm:text-[20px] lg:text-[22px] font-bold text-[#223581]">
                      <p className="flex-1 flex items-center justify-end m-0">
                        Total:
                      </p>
                      <span className="flex-1 flex items-center justify-end">
                        {formatCurrency(invoice.final_total)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="flex flex-col md:flex-row gap-y-10 justify-between md:items-end py-[30px] px-3 xl:px-[60px] pr-[45px] text-black">
                    <div>
                      <div className="text-2xl lg:text-[32px] font-bold mb-[6px] mb-[15px]">
                        Payment Details
                      </div>
                      <div className="text-[22px] text-[#515151]">
                        BACS: {formatCurrency(invoice.final_total)}
                      </div>
                      {invoice.driver?.bank_account_no && (
                        <div className="text-[18px] text-[#515151] mt-2">
                          Account No: {invoice.driver.bank_account_no}
                        </div>
                      )}
                      {invoice.driver?.iban_no && (
                        <div className="text-[18px] text-[#515151] mt-1">
                          IBAN: {invoice.driver.iban_no}
                        </div>
                      )}
                      {invoice.driver?.payment_reference && (
                        <div className="text-[18px] text-[#515151] mt-1">
                          Reference: {invoice.driver.payment_reference}
                        </div>
                      )}
                    </div>

                    <div className="flex items-end h-full">
                      <div className="text-2xl lg:text-[32px] font-bold mr-[12px]">
                        Signed:
                      </div>
                      <div
                        className="w-[220px] border-b border-black"
                        style={{ height: "20px" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ==================== FOOTER SECTION ==================== */}


              <section className="relative h-[150px] sm:h-[260px] md:h-[320px] lg:h-[380px] xl:h-[467px] overflow-hidden  bg-white">
                <img src="/img/red-shade2.png" alt="shape" className="absolute -bottom-[24px] right-20  h-[150px] lg:h-auto  w-full rotate-[1deg]" />

                <img src="/img/blue-shade2.png"
                  alt="shape" className="absolute bottom-0 h-[150px] lg:h-auto  w-full  " />

                <img src="/img/logoi.png" alt="UCH Logistics" className="absolute w-[150px]  md:w-[200px]  bottom-[40px] right-[10px] lg:bottom-[30px] lg:right-[30px] xl:w-[250px] xl:bottom-[50px] xl:right-[80px] " />
              </section>
            </div>
          ) : (
            <div className="text-center py-20">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
              <p className="text-gray-500 text-lg">No invoice data available</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

function Invoices() {
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

  // Modal states
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

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

  // Fetch single invoice and open preview modal
  const handlePreviewInvoice = async (invoiceId) => {
    try {
      setPreviewLoading(true);
      setIsPreviewModalOpen(true);

      const response = await fetchSingleInvoice(invoiceId);

      if (response.data.success) {
        setSelectedInvoice(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch invoice details");
        setIsPreviewModalOpen(false);
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch invoice details"
      );
      setIsPreviewModalOpen(false);
    } finally {
      setPreviewLoading(false);
    }
  };

  // Close preview modal
  const handleClosePreviewModal = () => {
    setIsPreviewModalOpen(false);
    setSelectedInvoice(null);
  };

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

        return true;
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
      throw error;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
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

        window.open(pdfUrl, "_blank");

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
      {/* Invoice Preview Modal */}
      <InvoicePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleClosePreviewModal}
        invoice={selectedInvoice}
        loading={previewLoading}
      />

      <section>
        {/* Filter Section */}
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-[20px] mb-6">
          <div className="flex flex-col items-start sm:flex-row sm:items-center flex-wrap xl:flex-nowrap gap-[20px] w-full xl:w-[70%]">
            <span className="text-[20px] font-bold">Filter:</span>

            {/* Date Range Filter */}
            <div className="flex w-full sm:w-[fit-content] flex-col sm:flex-row md:flex-nowrap flex-wrap items-center gap-[10px]">
              <div className="relative w-full">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  onKeyDown={(e) => e.preventDefault()}
                  className="py-[10px] px-[16px] w-full sm:w-[155px] rounded-[6px] border border-[#22358114] focus-visible:!outline-0 duration-300 focus-visible:border-[#515151] text-[#B4B4B4] text-[16px] font-normal"
                />
              </div>

              <p className="text-[#515151]">To</p>

              <div className="relative w-full sm:w-[155px]">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  onKeyDown={(e) => e.preventDefault()}
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
                      {/* {(searchTerm || fromDate || toDate) && (
                        <button
                          onClick={handleClearFilters}
                          className="text-secondary hover:underline"
                        >
                          Clear filters
                        </button>
                      )} */}
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
                      #{invoice.id?.slice(-8)}
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
                        className={`text-sm font-medium ${invoice.status !== "DRAFT"
                          ? "text-[#009249]"
                          : "text-[#C00000]"
                          }`}
                      >
                        {invoice.status}
                      </span>
                    </td>

                    <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114]">
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${invoice.is_paid === true
                          ? "text-[#009249] bg-[#009249]/10"
                          : "text-[#C00000] bg-[#C00000]/10"
                          }`}
                      >
                        {invoice.is_paid ? "Paid" : "Unpaid"}
                      </span>
                    </td>

                    <td className="px-[20px] py-[20px] 2xl:text-[18px] border-y border-[#22358114] border-r rounded-r-[15px]">
                      <div className="flex items-center justify-center gap-2">
                        {/* Preview Button */}
                        <button
                          onClick={() => handlePreviewInvoice(invoice.id)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                          title="Preview Invoice"
                        >
                          <svg
                            className="w-5 h-5 text-blue-500 group-hover:text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>

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
                className={`group px-3 border border-[#22358114] w-[40px] h-[40px] rounded-full text-sm duration-300 flex items-center justify-center ${currentPage === 1
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
                    className={`${currentPage === 1
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
                  className={`px-3 border w-[40px] h-[40px] rounded-full text-sm duration-300 ${page === currentPage
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
                className={`group px-3 border border-[#22358114] w-[40px] h-[40px] rounded-full text-sm duration-300 flex items-center justify-center ${currentPage === totalPages
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
                    className={`${currentPage === totalPages
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