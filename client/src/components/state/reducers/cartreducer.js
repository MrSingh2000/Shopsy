// This Reducer function is defined to change the items (state) in the cart

export default function cartreducer(state = [], action) {
    if (action.type === "addItem") {
        return [...state, action.payload.item];
    }
    else if (action.type === "removeItem") {
        return state.filter((val) => (val !== action.payload.item))
    }
    else {
        return state;
    }
}