import actions from "../constants/action-type";
import { ART, BASE_URL } from "../../middlewares/url";

const token = localStorage.getItem("token");
// const { loginStatus, loading,accessToken } = useSelector((state) => state.auth);

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
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    },
  });
