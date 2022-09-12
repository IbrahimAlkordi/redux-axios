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
    response: [
      {
        success({ getState }, res) {
          const token = res.data.accessToken;
          // localStorage.setItem("token", token);
          // console.log(token)
          return Promise.resolve(res);
        },
        error({ dispatch }, res) {
          return Promise.reject(res);
        },
      },
    ],
  },
};

export default axiosMiddleware(server, middlewareConfig);


