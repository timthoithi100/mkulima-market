import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth"
});

export const signup = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
export const getProfile = (token) =>
  API.get("/profile", { headers: { Authorization: `Bearer ${token}` } });
