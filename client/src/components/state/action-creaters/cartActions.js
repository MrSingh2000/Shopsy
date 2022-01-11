import store from "../store";

export const cartAdd = (item) => {
    store.dispatch({
        type: "addItem",
        payload: {
            item
        }
    })
}

export const cartRemove = (item) => {
    store.dispatch({
        type: "removeItem",
        payload: {
            item
        }
    })
}
