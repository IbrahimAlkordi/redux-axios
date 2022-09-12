import React from "react";
import actions from "../constants/action-type";
const initialState = {
  loading: null,
  error: null,
  data: null,
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.response.data.accessToken,
        isAuthenticated: true,
        loading: false,
      };
    case actions.LOGIN_FAIL:
      console.log(action.error);
      return {
        ...state,
        loading: false,

        error: action.error,
      };
    // case LOGOUT:
    //   return {
    //     ...state,
    //     accessToken: "",
    //     loginStatus: "1",
    //     loading: false,
    //   };
      case actions.CLEAR_LOGIN:
        return initialState;
    default:
      return state;
  }
};
export default loginReducer;
