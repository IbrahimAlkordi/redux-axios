import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import store from "../redux/store";
import { BASE_URL, LOGIN } from "./url";

const server = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// const middlewareConfig = server.interceptors.request.use((request) => {
//   console.log('======= HTTP Req', request);
//   const token = localStorage.getItem("token");
//   // const token = store.getItem().auth?.accessToken
//   if (request && request.url !== LOGIN && request.headers && token) {
//     request.headers.Authorization = `bearer ${token}`;
//   }
//   return request;
// });
const middlewareConfig = {
  interceptors: {
    request: [
      {
        success({ getState }, req) {
          const token = localStorage.getItem("token");

          if (req && req.url !== LOGIN && req.headers && token) {
            req.headers.Authorization = `bearer ${token}`;
          }

          return req;
        },
      },
    ],
    // response: [
    //   {
    //     success({ getState }, res) {
    //       return Promise.resolve(res);
    //     },
    //     error({ dispatch }, res) {
    //       return Promise.reject(res);
    //     },
    //   },
    // ],
  },
};

export default axiosMiddleware(server, middlewareConfig);
