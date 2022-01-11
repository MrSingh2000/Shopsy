import { combineReducers } from "redux";
import bugReducer from "./bugReducer";
import loaderReducer from "./loaderReducer";
import commentReducer from "./commentSent";
import cartreducer from "./cartreducer";
import authTokenReducer from "./authTokenReducer";

// This is to combine all the reducer function in one single thing
const reducers = combineReducers({
    bugs: bugReducer,
    loader: loaderReducer,
    commentSent: commentReducer,
    cart: cartreducer,
    authToken: authTokenReducer,
})

export default reducers;