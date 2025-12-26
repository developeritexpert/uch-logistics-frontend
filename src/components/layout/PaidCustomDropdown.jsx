import { useEffect, useRef, useState } from "react";

export default function PaidCustomDropdown({
  invoice,
  onDownload,
  onStatusUpdate,
  isDownloading,
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(invoice?.is_paid ? "Paid" : "Unpaid");
  const [isUpdating, setIsUpdating] = useState(false);
  const ref = useRef(null);

  // Sync status with invoice prop when it changes
  useEffect(() => {
    setStatus(invoice?.is_paid ? "Paid" : "Unpaid");
  }, [invoice?.is_paid]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDownload = async () => {
    try {
      await onDownload(invoice.id);
      // Dropdown closes automatically via the parent's success handler
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    const isPaid = newStatus === "Paid";
    
    // Only update if status actually changed
    if (invoice.is_paid === isPaid) {
      return;
    }

    setIsUpdating(true);
    try {
      await onStatusUpdate(isPaid);
      setStatus(newStatus);
      setOpen(false); // Close dropdown after successful update
    } catch (error) {
      // Revert to original status on error
      setStatus(invoice.is_paid ? "Paid" : "Unpaid");
      console.error("Status update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Close dropdown when download completes
  useEffect(() => {
    if (!isDownloading && open) {
      // Small delay to ensure user sees the completion
      const timer = setTimeout(() => {
        setOpen(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isDownloading]);

  return (
    <div ref={ref} className="relative">
      <button 
        onClick={() => setOpen(!open)} 
        className="p-1 cursor-pointer"
        disabled={isUpdating || isDownloading}
      >
        <svg width="33" height="8" viewBox="0 0 33 8" fill="none">
          <circle
            cx="29.33"
            cy="3.66"
            r="3.66"
            fill={open ? "#223581" : "#223581"}
            fillOpacity={open ? "1" : "0.08"}
          />
          <circle
            cx="16.5"
            cy="3.66"
            r="3.66"
            fill={open ? "#223581" : "#223581"}
            fillOpacity={open ? "1" : "0.08"}
          />
          <circle
            cx="3.66"
            cy="3.66"
            r="3.66"
            fill={open ? "#223581" : "#223581"}
            fillOpacity={open ? "1" : "0.08"}
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-[180px] rounded-[14px] border border-[#E5E7EB] bg-white shadow-[7px_11px_24px_#22358114] z-50 px-4 py-4">
          <p className="text-[14px] font-bold text-[#0F172A] mb-3">Payment Status</p>

          <div className="space-y-2 mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`status-${invoice.id}`}
                checked={status === "Paid"}
                onChange={() => handleStatusChange("Paid")}
                disabled={isUpdating}
                className="w-4 h-4 accent-[#1E3A8A]"
              />
              <span className="text-[12px] font-normal text-[#009249]">
                Paid
              </span>
              {isUpdating && status === "Paid" && (
                <svg
                  className="animate-spin h-3 w-3 text-[#009249]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`status-${invoice.id}`}
                checked={status === "Unpaid"}
                onChange={() => handleStatusChange("Unpaid")}
                disabled={isUpdating}
                className="w-4 h-4 accent-[#1E3A8A]"
              />
              <span className="text-[12px] font-normal text-[#C00000]">
                Unpaid
              </span>
              {isUpdating && status === "Unpaid" && (
                <svg
                  className="animate-spin h-3 w-3 text-[#C00000]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
            </label>
          </div>

          <button
            className="
              w-full
              bg-[#223581]
              text-white
              text-[12px]
              font-bold              
              rounded-[3px]
              px-[17px]
              py-[8px]
              leading-[1.2]
              mb-2
              hover:bg-[#1B2F73]
              transition
              cursor-pointer
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
            disabled={isUpdating || isDownloading}
          >
            Generate Bank Remittance
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading || isUpdating}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              border
              border-[#22358114]
              text-[12px]
              text-[#000]
              font-bold
              rounded-[3px]
              py-[8px]
              px-[10px]             
              hover:bg-gray-50
              transition
              cursor-pointer
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {isDownloading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-[#223581]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Download Invoice</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}