// These are some actions pre-coded into functions so that can be easily imported and used

import store from "../store";

export const setLoader = (val) => {
    store.dispatch({
        type: val,
    })
}

