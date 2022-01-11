export default function bugReducer(state = false, action) {
    if (action.type === true) {
        return true;
    }
    else if (action.type === false) {
        return false;
    }
    else {
        return state;
    }
}