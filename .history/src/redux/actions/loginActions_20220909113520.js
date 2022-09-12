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
      headers: {
        "Content-Type": "application/json",
      },
    },
  },
}) .then((response) => {
    console.log(response);
  });

export const clearLogin = () => ({
  type: actions.CLEAR_LOGIN,
});
