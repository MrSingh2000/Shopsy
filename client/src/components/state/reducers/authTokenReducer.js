export default function authTokenReducer(state = "", action) {
    if (action.type === "set") {
        return action.payload.value;
    }
    else if (action.type === "remove") {
        return "";
    }
    else {
        return state;
    }
}