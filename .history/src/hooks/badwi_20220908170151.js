import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { multiClientMiddleware } from "redux-axios-middleware";
import { apiUrl, apiTimeout } from "utils/constants";
import { saveAuthentication } from "store/actions/authenticationActions";
import { showToast } from "components/atoms/toast/showToast";
import {
  clearValuesAndLogout,
  resolveHttpError,
  translate,
} from "utils/common";
import { Alert } from "react-native";

const refreshTokenUrl = "api/refreshToken";
const saveAuthEndPoint = [refreshTokenUrl, "api/checkAppOTP"];
const commonHeaders = { "Accept-Language": "ar", isMobile: "true" };

const apiOptions = {
  baseURL: apiUrl,
  headers: commonHeaders,
  timeout: apiTimeout,
};

const authenticatedClient = axios.create(apiOptions);
const unauthenticatedClient = axios.create(apiOptions);

const refreshToken = () => {
  const body = {
    refresh_token: "",
  };
  return authenticatedClient.post(refreshTokenUrl, body);
};

createAuthRefreshInterceptor(authenticatedClient, refreshToken);

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
                res.config.url === refreshTokenUrl
              )
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
            showToast(translate("globals.session_expired"));
            clearValuesAndLogout(dispatch);
          } else if (
            // eslint-disable-next-line prettier/prettier
            res.response.status === 401 &&
            // eslint-disable-next-line prettier/prettier
            res.response.config.authenticated
          ) {
            Alert.alert(translate("globals.session_expired"), "", [
              {
                text: translate("globals.ok"),
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

const clients = {
  unAuthenticated: {
    client: unauthenticatedClient,
  },
  authenticated: {
    client: authenticatedClient,
  },
};

export default multiClientMiddleware(clients, middlewareConfig);
