import { useEffect, useRef, useState } from "react";

export default function PaidCustomDropdown() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Paid");
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Three dots */}
      <button onClick={() => setOpen(!open)}>
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

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-10 w-[150px] rounded-[14px] border border-[#E5E7EB] bg-white shadow-xl z-50 px-4 py-4">

          {/* Status */}
          <p className="text-[14px] font-bold text-[#0F172A] mb-3">
            Status
          </p>

          <div className="space-y-3 mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={status === "Paid"}
                onChange={() => setStatus("Paid")}
                className="w-4 h-4 accent-[#1E3A8A]"
              />
              <span className="text-[12px] font-normal text-[#009249]">
                Paid
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={status === "Unpaid"}
                onChange={() => setStatus("Unpaid")}
                className="w-4 h-4 accent-[#1E3A8A]"
              />
              <span className="text-[12px] font-normal text-[#C00000]">
                Unpaid
              </span>
            </label>
          </div>

          {/* Primary action */}
          <button
            className="
              w-full
              bg-[#223581]
              text-white
              text-[10px]
              font-bold              
              rounded-[3px]
             px-[17px]
             py-[6px]
             leading-normal
              mb-2
              hover:bg-[#1B2F73]
              transition
            "
          >
            Generate Bank Remittance
          </button>

          {/* Secondary action */}
          <button
            className="
              w-full
              border
              border-[#22358114]
              text-[10px]
              font-bold
              rounded-[3px]
              py-[8px]
              px-[10x]             
              hover:bg-gray-50
              transition
            "
          >
            Download Invoice
          </button>
        </div>
      )}
    </div>
  );
}
