import _ from 'lodash'
import {ADD_ARTICLE, DELETE_ARTICLE, EDIT_ARTICLE, FETCH_ARTICLE, FETCH_NEWS} from "../actions/types";
const initialState = {
        content: '',
        timestamp: '',
        title: '',
        userName: ''
    };
export const news = (state = [], action) => {
    switch (action.type){
        case FETCH_NEWS:
            return action.payload;
        default:
            return state;
    }
};

export const article =  (state = initialState, action) => {
    switch (action.type){
        case FETCH_ARTICLE:
            //console.log(action.payload)
            //to do
            return action.payload
        case ADD_ARTICLE:
            return action.payload;
        case EDIT_ARTICLE:
            //console.log('edit', action.payload)
            return action.payload;
        case DELETE_ARTICLE:
            return state;
        default:
            return state;
    }
};


