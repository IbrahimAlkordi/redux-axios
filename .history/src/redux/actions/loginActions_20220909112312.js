import actions from "../constants/action-type";
import { BASE_URL,LOGIN } from "../../middlewares/url";

export const loginAction = (username, password) => ({
  type: actions.LOGIN,
  payload: {
    request: {
      url:BASE_URL+LOGIN,
      method: "POST",
      data: {
        username: username,
        password: password,
      },
    },
  },
});

export const clearLogin = () => ({
  type: actions.CLEAR_LOGIN,
});
