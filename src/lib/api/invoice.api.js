import api from "./axios";

export const fetchAllInvoices = () =>
  api.get("/invoice/get-all-invoices");

export const fetchSingleInvoice = (id) =>
  api.get("/invoice/get-invoice/" + id);

export const updateInvoice = (id, data) =>
  api.patch("/invoice/update-invoice/" + id, data);

export const deleteInvoice = (id) =>
  api.delete("/invoice/delete-invoice/" + id);

export const generateDraftInvoice = (data) =>
  api.post("/invoice/generate-draft-invoice", data);

export const generateFinalInvoice = (data) => 
  api.post("/invoice/generate-final-invoice", data);

export const getInvoicePdfUrl = (invoiceId) =>
  api.get(`/invoice/pdf/${invoiceId}`);