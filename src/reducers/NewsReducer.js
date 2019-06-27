import _ from 'lodash'
import {ADD_ARTICLE, EDIT_ARTICLE, FETCH_ARTICLE, FETCH_NEWS} from "../actions/types";
const initialState = {
    articleId: {
        articleId: '',
        content: '',
        timestamp: '',
        title: '',
        userName: ''
    }
}
export default (state = initialState, action) => {
    switch (action.type){
        case FETCH_NEWS:
            console.log(action.payload);
            return action.payload;
        case FETCH_ARTICLE:
            //console.log(action.payload)
            //to do
            return action.payload
        case ADD_ARTICLE:
            return action.payload;
        case EDIT_ARTICLE:
            //console.log('edit', action.payload)
            return action.payload;
        default:
            return state;
    }
}