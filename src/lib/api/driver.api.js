import api from "./axios";

export const fetchAllDrivers = (data) =>
  api.get("/driver/get-all-drivers", {
    params: data,
  });

export const fetchSingleDriver = (id) =>
  api.get("/driver/get-driver/" + id);

export const addDriver = (data) =>
  api.post("/driver/add-driver", data);

export const updateDriver = (id, data) =>
  api.patch("/driver/update-driver/" + id, data);

export const deleteDriver = (id) =>
  api.delete(`/driver/delete-driver/${id}`);