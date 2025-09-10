import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/listings"
});

export const getListings = () => API.get("/");
export const createListing = (data, token) =>
  API.post("/", data, { headers: { Authorization: `Bearer ${token}` } });
export const getMyListings = (token) =>
  API.get("/me", { headers: { Authorization: `Bearer ${token}` } });
export const deleteListing = (id, token) =>
  API.delete(`/${id}`, { headers: { Authorization: `Bearer ${token}` } });
