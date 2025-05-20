import axios from "axios";

const backend = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: backend,
  withCredentials: true, // Sends cookies for authentication
});

const publicApi = axios.create({
  baseURL: backend,
  withCredentials: false, // No cookies for public APIs
});

export { api, publicApi };