import {SIGN_IN, SIGN_OUT} from "../actions/types";

const INITIAL_STATE = {
    user:{
        name: null,
        userId: null
    },
    isSignedIn: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case SIGN_IN:
            return {...state, isSignedIn: true, user: action.payload}
        case SIGN_OUT:
            return {...state, isSignedIn: false, user: {}}
        default:
            return state
    }
}