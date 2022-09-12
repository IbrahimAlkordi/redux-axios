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

const middlewareConfig = {
  interceptors: {
    request: [
      {
        success({ getState }, req) {
          // console.log('======= HTTP Req', req);
          const { authentication } = getState();
          if (req.authenticated) {
            req.headers.authorization = `${authentication.access_token}`;
          }
          if (req.url === refreshTokenUrl) {
            req.headers.authorization = authentication.refresh_token_header;
            req.data.refresh_token = authentication.refresh_token;
          }

          return req;
        },
        error({ dispatch }, res) {
          // console.log('======= HTTP Error Res', res);
          if (res.response === undefined) {
            showToast(resolveHttpError(res.response));
          }

          if (!res.response) {
            return Promise.reject(res);
          }
          if (res.config.url === refreshTokenUrl) {
            showToast(translate('globals.session_expired'));
            clearValuesAndLogout(dispatch);
          } else if (
            // eslint-disable-next-line prettier/prettier
            res.response.status === 401
            // eslint-disable-next-line prettier/prettier
            && res.response.config.authenticated
          ) {
            Alert.alert(translate('globals.session_expired'), '', [
              {
                text: translate('globals.ok'),
                onPress: () => {
                  clearValuesAndLogout(dispatch);
                },
              },
            ]);
          } else if (!res.response.config.errorAction) {
            showToast(resolveHttpError(res.response));
          }
          return Promise.reject(res);
        },
      },
    ],
    response: [
      {
        success({ dispatch }, res) {
          // console.log('======= HTTP Success Res', res);
          if (saveAuthEndPoint.includes(res.config.url)) {
            dispatch(
              saveAuthentication(
                res.data.data.result,
                res.config.url === refreshTokenUrl,
              ),
            );
          }
          return Promise.resolve(res);
        },
        error({ dispatch }, res) {
          // console.log('======= HTTP Error Res', res);
          if (res.response === undefined) {
            showToast(resolveHttpError(res.response));
          }

          if (!res.response) {
            return Promise.reject(res);
          }
          if (res.config.url === refreshTokenUrl) {
            showToast(translate('globals.session_expired'));
            clearValuesAndLogout(dispatch);
          } else if (
            // eslint-disable-next-line prettier/prettier
            res.response.status === 401
            // eslint-disable-next-line prettier/prettier
            && res.response.config.authenticated
          ) {
            Alert.alert(translate('globals.session_expired'), '', [
              {
                text: translate('globals.ok'),
                onPress: () => {
                  clearValuesAndLogout(dispatch);
                },
              },
            ]);
          } else if (!res.response.config.errorAction) {
            showToast(resolveHttpError(res.response));
          }
          return Promise.reject(res);
        },
      },
    ],
  },
};

// const middlewareConfig = server.interceptors.request.use((request) => {
//   // const token = localStorage.getItem("token");
//   const token = storage.getItem().auth?.accessToken
//   if (request && request.url !== LOGIN && request.headers && token) {
//     request.headers.Authorization = `bearer ${token}`;
//   }
//   return request;
// });

export default axiosMiddleware(server,middlewareConfig);
