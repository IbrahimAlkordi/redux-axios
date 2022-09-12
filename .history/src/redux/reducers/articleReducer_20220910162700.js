import actions from "../constants/action-type";

const initialState = {
  articles: [],
  filteredArticles: [],
  searchInput: "",
  articleStatus: "",
  loading: false,
  articleError: "",
};
const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ARTICLES:
      console.log(action)
      return {
        ...state,
        loading: true,
      };
    case actions.ARTICLES_SUCCESS:
      console.log(action)
      console.log(action.payload.data.response.docs);
      return {
        ...state,
        articles: [...state.articles, ...action.articles],
        loading: false,
        articleStatus: "success",
      };
    // case ARTICLES_FAILED:
    //   return {
    //     ...state,
    //     loading: false,
    //     articleStatus: "Failed",
    //   };
    // case SEARCH_ARTICLES:
    //   return {
    //     ...state,
    //     searchInput: action.payload.search,
    //     filteredArticles: state.articles.filter((article) =>
    //       article.abstract
    //         .toString()
    //         .toLowerCase()
    //         .match(state.searchInput.toString().toLowerCase())
    //     ),
    //   };

    default:
      return state;
  }
};
export default articleReducer;
