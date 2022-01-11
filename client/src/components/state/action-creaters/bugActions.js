// These are some actions pre-coded into functions so that can be easily imported and used

import store from "../store";

export const addBug = (val) => {
    store.dispatch({
        type: "bugAdded",
        payload: {
            value: val
        }
    })
}

export const removeBug = (val) => {
    store.dispatch({
        type: "bugRemoved",
        payload: {
            value: val
        }
    })
}
