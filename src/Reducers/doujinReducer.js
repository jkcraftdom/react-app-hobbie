import { SET_DOUJIN } from "../Actions/types";

const initialState = {
    doujin: null
}

const doujinReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_DOUJIN:
            return {...state, doujin: action.payload}
        default:
            return {...state}
    }
    
}

export default doujinReducer