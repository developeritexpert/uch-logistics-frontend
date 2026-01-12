import Loader from "./Loader";

export const InvoicePreviewModal = ({ isOpen, onClose, invoice, loading }) => {
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
              <span className="text-sm opacity-80">#{invoice.id}</span>
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
                  <p className="text-[18px] mb-[3px] mt-0">
                    +44 (0) 1784 242 824
                  </p>

                  <h3 className="text-[22px] font-bold text-[#223581] mb-[2px] mt-0">
                    Fax:
                  </h3>
                  <p className="text-[18px] mb-[3px] mt-0">
                    +44 (0) 1784 245 222
                  </p>

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
                      style={{
                        borderColor: "#2235811A",
                        padding: "28px 30px 30px 30px",
                        minWidth: "260px",
                      }}
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
                      style={{
                        borderColor: "#2235811A",
                        padding: "28px 30px 30px 30px",
                        minWidth: "260px",
                      }}
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
                      style={{
                        borderColor: "#2235811A",
                        padding: "28px 30px 30px 30px",
                      }}
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
                          #{invoice.id?.slice(-6).toUpperCase() || "N/A"} <br />
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
                <img
                  src="/img/red-shade2.png"
                  alt="shape"
                  className="absolute -bottom-[24px] right-20  h-[150px] lg:h-auto  w-full rotate-[1deg]"
                />

                <img
                  src="/img/blue-shade2.png"
                  alt="shape"
                  className="absolute bottom-0 h-[150px] lg:h-auto  w-full  "
                />

                <img
                  src="/img/logoi.png"
                  alt="UCH Logistics"
                  className="absolute w-[150px]  md:w-[200px]  bottom-[40px] right-[10px] lg:bottom-[30px] lg:right-[30px] xl:w-[250px] xl:bottom-[50px] xl:right-[80px] "
                />
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
