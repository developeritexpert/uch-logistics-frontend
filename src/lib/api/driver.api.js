import api from "./axios";

export const fetchAllDrivers = (data) =>
  api.get("/driver/get-all-drivers", {
    params: data,
  });

export const fetchSingleDriver = (id) =>
  api.get("/driver/get-driver/" + id);
