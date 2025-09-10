import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/notifications"
});

export const getNotifications = (token) =>
  API.get("/", { headers: { Authorization: `Bearer ${token}` } });

export const markAsRead = (id, token) =>
  API.put(`/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } });
