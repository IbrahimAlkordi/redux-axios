import actions from "../constants/action-type";
import { ART, BASE_URL } from "../../middlewares/url";

export const getArticles = (token, page) => ({
  type: actions.ARTICLES,
  payload: {
    request: {
      url: BASE_URL + ART,
      method: "GET",
      params: {
        page: page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  },
});

export const searchArticles = (searchInput) => ({
  type: actions.SEARCH_ARTICLES,
  payload: {
    search: searchInput,
  },
});
