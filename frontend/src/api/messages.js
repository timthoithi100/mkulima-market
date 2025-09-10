import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/messages"
});

export const sendMessage = (data, token) =>
  API.post("/", data, { headers: { Authorization: `Bearer ${token}` } });

export const getMessages = (userId, token) =>
  API.get(`/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
