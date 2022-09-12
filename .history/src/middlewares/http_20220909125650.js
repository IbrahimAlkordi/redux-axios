import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import { BASE_URL, LOGIN } from "./url";

const server = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

const middlewareConfig = server.interceptors.request.use((request) => {
  console.log('======= HTTP Req', request);
  // const token = localStorage.getItem("token");
  const token = storage.getItem().auth?.accessToken
  if (request && request.url !== LOGIN && request.headers && token) {
    request.headers.Authorization = `bearer ${token}`;
  }
  return request;
});



export default axiosMiddleware(server,middlewareConfig);