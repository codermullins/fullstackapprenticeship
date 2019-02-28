import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import createHistory from "history/createBrowserHistory";
import userReducer from "../reducers/user";
import authFormReducer from "../reducers/authForm";
import authReducer from "../reducers/auth";
import AuthStateReducer from "../reducers/authState";
import thunk from "redux-thunk";

const initialState = {};

export const history = createHistory();

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const rootReducer = combineReducers({
    router: connectRouter(history),
    user: userReducer,
    auth: authReducer,
    authForm: authFormReducer,
    authState: AuthStateReducer
});

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
