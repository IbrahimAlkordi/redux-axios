import actions from "../constants/action-type";
import { LOGIN } from "../../middlewares/url";

export const loginAction = (username, password) => ({
  type: actions.LOGIN,
  payload: {
    request: {
      url:" http://34.245.213.76:3000/auth/signin",
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
