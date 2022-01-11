import store from "../store";

export const setToken = (val) => {
    store.dispatch({
        type: "set",
        payload: {
            value: val
        }
    })
}

export const removeToken = () => {
    store.dispatch({
        type: "remove",
        payload: {
            value: ""
        }
    })
}
