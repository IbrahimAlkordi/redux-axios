import { createStore,applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from './reducers/index'
import httpMiddleware from '../middlewares/http';

const middlewares = [thunk];
middlewares.push(httpMiddleware);

const store = createStore(reducers,applyMiddleware(...middlewares));



// store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares), sentryReduxEnhancer));

export default store;



