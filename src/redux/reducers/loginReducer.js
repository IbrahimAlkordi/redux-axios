// import React from "react";
import actions from "../constants/action-type";
const initialState = {
  loading: null,
  error: null,
  data: null,

  loginStatus: "",
  isAuthenticated: false,
  accessToken: "",
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      console.log(action);
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.LOGIN_SUCCESS:
      console.log(action);
      console.log(action.payload.data);

      return {
        ...state,
        // accessToken: action.response.data.accessToken,
        isAuthenticated: true,
        loading: false,
        loginStatus: "success",
        accessToken: action.payload.data.accessToken,
      };
    case actions.LOGIN_FAIL:
      console.log(action.error);
      return {
        ...state,
        loading: false,
        loginStatus: "Failed",
        error: action.error,
      };

    case actions.LOGOUT:
      return initialState;

    case actions.CLEAR_LOGIN:
      return initialState;

    default:
      return state;
  }
};
export default loginReducer;
