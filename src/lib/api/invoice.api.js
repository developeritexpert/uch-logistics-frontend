import api from "./axios";

export const fetchAllInvoices = () =>
  api.get("/invoice/get-all-invoices");


