import actions from "../constants/action-type";
import { ART, BASE_URL } from "../../middlewares/url";

// const token = localStorage.getItem("token");
const { accessToken } = useSelector((state) => state.auth);
console.log(token);
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
          Authorization: `Bearer ${accessToken}`,
        },
      },
    },
  });
