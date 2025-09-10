import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const initiatePayment = (data, token) =>
  API.post("/payments/initiate", data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getTransactions = (token) =>
  API.get("/transactions", {
    headers: { Authorization: `Bearer ${token}` }
  });
