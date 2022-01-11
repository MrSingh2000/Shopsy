import store from "./state/store";
import React from 'react'
import combinedReducers from "./state/reducers/combinedReducers";
import { useDispatch, useSelector } from "react-redux";
import {addBug, removeBug} from "./state/action-creaters/bugActions";

export default function SampleStore() {
    // const dispatch = useDispatch();


    const bugs = useSelector(state => state.bugs)
    console.log(bugs)
    // console.log(store.getState());

    const one = () => {
        store.dispatch({
            type: "bugAdded",
            payload: {
                value: 2
            }
        })
    }

    const two = () => {
        store.dispatch({
            type: "bugRemoved",
            payload: {
                value: 2
            }
        })
    }
    
    return (
        <div>
            This is sample file
            <button onClick={() => {addBug(2)}} style={{backgroundColor: 'red', marginRight: '10px'}}>Increase</button>
            <button onClick={() => {removeBug(1)}} style={{backgroundColor: 'green'}}>Decrease</button>
            <div>
                This is the current value of Bugs: {bugs}
            </div>
        </div>
    )
}
