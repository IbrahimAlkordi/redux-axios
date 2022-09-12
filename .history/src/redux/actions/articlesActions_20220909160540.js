import actions from "../constants/action-type";
import { ART, BASE_URL } from "../../middlewares/url";

export const getArticles =  (page) => ({
    type: actions.ARTICLES,
    payload: {
      request: {
        url:BASE_URL+ART,
        method: "GET",
        params : {
           page : page
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
  });
