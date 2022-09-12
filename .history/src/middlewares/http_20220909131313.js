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
          const { authentication } = getState();
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
    response: [
      {
        success({ dispatch }, res) {
          if (res.config.url === '/api/refreshToken') {
            dispatch(saveAuthentication(res.data.data.result));
          }
          return Promise.resolve(res);
        },
        error({ dispatch }, res) {
          /* if (res && res.response && res.response.status === 401 && res.response.config.skipAuthRefresh) {
            dispatch(clearAuthentication());
          } */
          if (res.config.url === '/api/refreshToken') {
            dispatch(clearAuthentication());
            dispatch(clearMyPageCategories());
            dispatch(clearStories());
            dispatch(saveMessage(constants.errors.sessionTimeout));
            window.location.href = '/login';
          }
          return Promise.reject(res);
        },
      },
    ],
  }
}



export default axiosMiddleware(server,middlewareConfig);
