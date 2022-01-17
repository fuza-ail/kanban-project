import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import boardReducer from "./reducer/boardReducer";
import groupReducer from "./reducer/groupReducer";

const reducer = combineReducers({ boardReducer, groupReducer });

const store = createStore(reducer, applyMiddleware(thunk));

export default store;