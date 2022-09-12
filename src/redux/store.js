import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers/index";
import httpMiddleware from "../middlewares/http";

const middlewares = [reduxThunk];
middlewares.push(httpMiddleware);

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
