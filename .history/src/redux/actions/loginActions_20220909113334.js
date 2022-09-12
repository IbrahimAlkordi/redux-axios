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
    const token = response.data.accessToken;
    localStorage.setItem("token", token);

    dispatch({ type: LOGIN_SUCCESS, response });
  })
  .catch((err) => {
    dispatch({ type: LOGIN_FAILED, err });
  });;

export const clearLogin = () => ({
  type: actions.CLEAR_LOGIN,
});
