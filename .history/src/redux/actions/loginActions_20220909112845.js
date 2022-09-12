import actions from "../constants/action-type";
import { BASE_URL,LOGIN } from "../../middlewares/url";

export const loginAction = (user) => ({
  type: actions.LOGIN,
  payload: {
    request: {
      url:BASE_URL+LOGIN,
      method: "POST",
      data: {
        username: user.username,
        password: user.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    },
  },
});

export const clearLogin = () => ({
  type: actions.CLEAR_LOGIN,
});
