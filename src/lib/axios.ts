import axios from "axios";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Attach access token automatically if available
API.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;