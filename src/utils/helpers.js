import { deleteDriver } from "@/lib/api/driver.api";
import { toast } from "react-hot-toast";

export const formatDriverRate = (driver) => {
  if (driver?.per_hour_rate) {
    return `$${driver.per_hour_rate} for ${
      driver.total_hours ?? 0
    } hours / week`;
  }

  if (driver?.weekly_fixed_rate) {
    return `$${driver.weekly_fixed_rate} for ${
      driver.total_days ?? 0
    } days / week`;
  }

  return "-";
};

export async function handleDeleteDriver({
  driverId,
  driverName,
  onError,
  onSuccess,
  setLoading,
  closeModal,
}) {
  try {
    setLoading(true);

    const response = await deleteDriver(driverId);

    if (response?.data?.success) {
      toast.success(`Driver ${driverName} deleted successfully`);
      closeModal?.();
      onSuccess?.(`Driver ${driverName} deleted successfully`);
    } else {
      const errorMsg = response?.data?.message || "Failed to delete driver";
      toast.error(errorMsg);
      onError?.(errorMsg);
    }
  } catch (error) {
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to delete driver";
    toast.error(errorMsg);
    onError?.(errorMsg);
  } finally {
    setLoading(false);
  }
}

export const formatDateForAPI = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const calculatePageNumbers = (totalPages, currentPage) => {
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    }
  }

  return pages;
};
