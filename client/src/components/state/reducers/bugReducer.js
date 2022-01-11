// This Reducer function is defined to change the state of Bug state

export default function bugReducer(state = 0, action) {
    if (action.type === "bugAdded") {
        return state + action.payload.value;
    }
    else if (action.type === "bugRemoved") {
        return state - action.payload.value;
    }
    else {
        return state;
    }
}