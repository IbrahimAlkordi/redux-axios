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
          const { authentication } = getState();
            if (req && req.url !== LOGIN && request.headers && token) {
    req.headers.Authorization = `bearer ${token}`;}
          if (req.authenticated) {
            req.headers.authorization = `${authentication.access_token}`;
          }
          if (req.url === '/api/refreshToken') {
            req.headers.authorization = authentication.refresh_token_header;
            req.data.refresh_token = authentication.refresh_token;
          }
          return req;
        },
      },
    ],
  }
}



export default axiosMiddleware(server,middlewareConfig);
