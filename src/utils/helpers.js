export const formatDriverRate = (driver) => {
  if (driver?.per_hour_rate) {
    return `$${driver.per_hour_rate} for ${driver.total_hours ?? 0} hours / week`;
  }

  if (driver?.weekly_fixed_rate) {
    return `$${driver.weekly_fixed_rate} for ${driver.total_days ?? 0} days / week`;
  }

  return "-";
};
