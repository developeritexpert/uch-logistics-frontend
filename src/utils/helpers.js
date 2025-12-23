
import { deleteDriver } from "@/lib/api/driver.api";
import { toast } from "react-hot-toast";

export const formatDriverRate = (driver) => {
  if (driver?.per_hour_rate) {
    return `$${driver.per_hour_rate} for ${driver.total_hours ?? 0} hours / week`;
  }

  if (driver?.weekly_fixed_rate) {
    return `$${driver.weekly_fixed_rate} for ${driver.total_days ?? 0} days / week`;
  }

  return "-";
};

export async function handleDeleteDriver({
  driverId,
  driverName,
  onSuccess,
  onError,
  setLoading,
  closeModal,
}) {
  try {
    setLoading(true);

    const response = await deleteDriver(driverId);

    if (response?.data?.success) {
      onSuccess?.(`Driver ${driverName} deleted successfully`);
      toast.success(`Driver ${driverName} deleted successfully`);
      closeModal?.();
    } else {
      throw new Error(
        response?.data?.message || "Failed to delete driver"
      );
      toast.error(response?.data?.message);
    }
  } catch (error) {
    onError?.(
      error?.message ||
      error?.response?.data?.message ||
      "Failed to delete driver"
    );
    toast.error(response?.data?.message);
  } finally {
    setLoading(false);
  }
}

