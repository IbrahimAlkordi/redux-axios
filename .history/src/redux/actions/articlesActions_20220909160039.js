import actions from "../constants/action-type";
import { ART, BASE_URL } from "../../middlewares/url";

export const getArticles =  (accessToken) => ({
    type: actions.ARTICLES,
    payload: {
      request: {
        url:BASE_URL+ART,
        method: "GET",
        data: {
            accessToken
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