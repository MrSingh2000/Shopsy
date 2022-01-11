// This Reducer function is defined to change the state if comment is sent or not, as we need to render the data again if comment is sent

export default function commentReducer(state = false, action) {
    if (action.type === "sent") {
        return true;
    }
    else if (action.type === "notSent") {
        return false;
    }
    else {
        return state;
    }
}