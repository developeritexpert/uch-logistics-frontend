import api from "./axios";

export const fetchAllJobs = (data) =>
  api.get("/job/get-all-jobs", {
    params: data,
  });

