import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin"
});

export const getAllUsers = (token) =>
  API.get("/users", { headers: { Authorization: `Bearer ${token}` } });

export const getAllListings = (token) =>
  API.get("/listings", { headers: { Authorization: `Bearer ${token}` } });

export const getAllTransactions = (token) =>
  API.get("/transactions", { headers: { Authorization: `Bearer ${token}` } });

export const sendBroadcast = (message, token) =>
  API.post(
    "/broadcast",
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
