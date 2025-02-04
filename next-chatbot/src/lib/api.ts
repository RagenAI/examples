import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    // "x-api-key": `${process.env.RAGEN_API_KEY}`,
    "x-api-key": `${process.env.NEXT_PUBLIC_RAGEN_API_KEY}`,
  },
});

export const api = axiosInstance;
