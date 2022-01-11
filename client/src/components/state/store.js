import { createStore } from "redux";
// import reducer from "./reducers/bugReducer";
import combinedReducers from "./reducers/combinedReducers";

const store = createStore(combinedReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;