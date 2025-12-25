"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
import Input from "../form/Input";
import CustomSelect from "../layout/CustomSelect";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { fetchSingleJob, updateJob } from "@/lib/api/job.api";
import Loader from "./Loader";

function EditJob() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    driver_id: "",
    driver_name: "",
    call_sign: "",
    docket_no: "",
    tariff: "",
    date: "",
    time: "",
    pickup: "",
    dropoff: "",
    driver_total: "",
  });

  useEffect(() => {
    if (id) {
      fetchJobData();
    }
  }, [id]);

  const parseDatetime = (dateTimeStr) => {
    if (!dateTimeStr) return { date: "", time: "" };

    try {
      const [datePart, timePart] = dateTimeStr.split(" ");
      const [day, month, year] = datePart.split("/");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
      const formattedTime = timePart ? timePart.substring(0, 5) : "";
      return { date: formattedDate, time: formattedTime };
    } catch (error) {
      console.error("Error parsing datetime:", error);
      return { date: "", time: "" };
    }
  };

  const parseJourney = (journeyStr) => {
    if (!journeyStr) return { pickup: "", dropoff: "" };

    try {
      const cleanJourney = journeyStr
        .replace("PRE: ", "")
        .replace("POST: ", "");
      const [pickup, dropoff] = cleanJourney.split(" - ");

      return {
        pickup: pickup?.trim() || "",
        dropoff: dropoff?.trim() || "",
      };
    } catch (error) {
      console.error("Error parsing journey:", error);
      return { pickup: "", dropoff: "" };
    }
  };

  const fetchJobData = async () => {
    try {
      setLoading(true);
      const response = await fetchSingleJob(id);

      if (response.data?.success) {
        const job = response.data.data;

        const { date, time } = parseDatetime(job.date_time);
        const { pickup, dropoff } = parseJourney(job.journey);

        setFormData({
          driver_id: job.driver_id || "",
          driver_name: job.driver?.name || job.call_sign || "",
          call_sign: job.call_sign || "",
          docket_no: job.docket_no || "",
          tariff: job.tariff || "",
          date: date,
          time: time,
          pickup: pickup,
          dropoff: dropoff,
          driver_total: job.driver_total?.toString() || "",
        });

        // toast.success('Job data loaded successfully');
      } else {
        toast.error(response.data?.message || "Failed to fetch job data");
      }
    } catch (error) {
      console.error("Error fetching job:", error);
      toast.error(error.response?.data?.message || "Failed to fetch job data");
      router.push("/job-management");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDataForSubmission = () => {
    const localDateTime = new Date(`${formData.date}T${formData.time}:00`);
    const date_time = localDateTime.toISOString();
    const journey = `PRE: ${formData.pickup} - ${formData.dropoff}`;

    return {
      docket_no: formData.docket_no,
      date_time: date_time,
      tariff: formData.tariff,
      journey: journey,
      driver_total: parseFloat(formData.driver_total) || 0,
      driver_id: formData.driver_id,
      call_sign: formData.call_sign,
    };
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.call_sign.trim()) errors.push("Callsign is required");
    if (!formData.docket_no.trim()) errors.push("Docket number is required");
    if (!formData.tariff) errors.push("Tariff is required");
    if (!formData.date) errors.push("Date is required");
    if (!formData.time) errors.push("Time is required");
    if (!formData.pickup.trim()) errors.push("Pickup location is required");
    if (!formData.dropoff.trim()) errors.push("Drop-off location is required");
    if (!formData.driver_total || isNaN(parseFloat(formData.driver_total))) {
      errors.push("Valid driver total is required");
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    try {
      setUpdating(true);

      const payload = formatDataForSubmission();
      console.log("Submitting payload:", payload);

      const response = await updateJob(id, payload);

      if (response.data?.success) {
        toast.success(response.data?.message || "Job updated successfully!");

        setTimeout(() => {
          router.push("/job-management");
        }, 1000);
      } else {
        toast.error(response.data?.message || "Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);

      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.message || err);
        });
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to update job. Please try again."
        );
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    router.push("/job-management");
  };

  if (loading) {
    return <Loader text="Loading job data..." />;
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { href: "/dashboard", isHome: true },
          { label: "Job Management", href: "/job-management" },
          { label: formData.docket_no || id },
        ]}
      />

      <div className="mx-auto bg-white rounded-lg shadow py-[20px] px-[10px] sm:p-[25px] md:p-[40px] md:pt-[28px] mt-[30px]">
        <h2 className="text-[22px] font-black text-primary mb-[20px]">
          Edit Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[18px]">
          {/* Driver Name */}
          <Input
            label="Driver Name"
            value={formData.driver_name}
            onChange={(e) => handleInputChange("driver_name", e.target.value)}
            disabled
          />

          {/* Callsign */}
          <Input
            label="Callsign"
            value={formData.call_sign}
            onChange={(e) => handleInputChange("call_sign", e.target.value)}
          />

          {/* Docket */}
          <Input
            label="Docket"
            value={formData.docket_no}
            onChange={(e) => handleInputChange("docket_no", e.target.value)}
          />

          {/* Tariff */}
          <CustomSelect
            label="Tariff"
            value={formData.tariff}
            defaultValue={formData.tariff}
            onChange={(value) => handleSelectChange("tariff", value)}
          />

          {/* Date */}
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />

          {/* Time */}
          <Input
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
          />

          {/* Pickup Location - Changed to Input */}
          <Input
            label="Pickup Location"
            value={formData.pickup}
            placeholder="Enter pickup location"
            onChange={(e) => handleInputChange("pickup", e.target.value)}
          />

          {/* Drop-off Location - Changed to Input */}
          <Input
            label="Drop-off Location"
            value={formData.dropoff}
            placeholder="Enter drop-off location"
            onChange={(e) => handleInputChange("dropoff", e.target.value)}
          />

          {/* Driver Total */}
          <div className="md:col-span-2">
            <Input
              label="Driver Total"
              type="number"
              step="0.01"
              min="0"
              value={formData.driver_total}
              onChange={(e) =>
                handleInputChange("driver_total", e.target.value)
              }
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-[40px]">
          <button
            onClick={handleSubmit}
            disabled={updating}
            className="bg-primary border border-primary hover:bg-primary/20 hover:text-primary duration-300 cursor-pointer text-white text-sm font-semibold px-[25px] py-[10px] rounded-[6px] min-w-[150px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {updating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Updating...
              </>
            ) : (
              "Update Job"
            )}
          </button>
          <button
            onClick={handleCancel}
            disabled={updating}
            className="bg-secondary border border-secondary hover:bg-secondary/20 hover:text-secondary duration-300 cursor-pointer text-white text-sm font-semibold px-[25px] py-[10px] rounded-[6px] min-w-[150px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditJob;
