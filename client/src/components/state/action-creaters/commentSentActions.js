import store from "../store";

export const commentSentFalse = () => {
    store.dispatch({
        type: 'notSent'
    })
};

export const commentSentTrue = () => {
    store.dispatch({
        type: 'sent'
    })
}