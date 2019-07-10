import _ from 'lodash'
import {
    CREATE_ARTICLE_ERROR,
    CREATE_ARTICLE_SUCCESS,
    DELETE_ARTICLE,
    EDIT_ARTICLE_SUCCESS,
    EDIT_ARTICLE_ERROR,
    FETCH_ARTICLE,
    FETCH_NEWS} from "../actions/types";

const initialState = {
        content: '',
        timestamp: '',
        title: '',
        userName: '',
        errorMessage: null
    };

export const news = (state = [], action) => {
    switch (action.type){
        case FETCH_NEWS:
            return { ...state, ..._.mapKeys(action.payload, 'timestamp')};
        default:
            return state;
    }
};

export const article =  (state = initialState, action) => {
    switch (action.type){
        case FETCH_ARTICLE:
            //console.log(action.payload)
            //to do
            return {
            ...state,
            timestamp: action.payload.timestamp,
            title: action.payload.title,
            content: action.payload.content,
            articleId: action.payload.articleId,
            userName: action.payload.userName,
            userId: action.payload.userId,
            errorMessage: null
        };

        case CREATE_ARTICLE_SUCCESS:
            return {
                ...state,
                timestamp: action.payload.timestamp,
                title: action.payload.title,
                content: action.payload.content,
                articleId: action.payload.articleId,
                userName: action.payload.userName,
                userId: action.payload.userId,
                errorMessage: null
            };

        case CREATE_ARTICLE_ERROR:
            return { ...state, errorMessage: action.payload};

        case EDIT_ARTICLE_SUCCESS:
            console.log('TRUE edit success')
            return {
                ...state,
                timestamp: action.payload.timestamp,
                title: action.payload.title,
                content: action.payload.content,
                articleId: action.payload.articleId,
                errorMessage: null
            };

        case EDIT_ARTICLE_ERROR:
            console.log('edit error')
            return { ...state, errorMessage: action.payload};

        case DELETE_ARTICLE:
            return state;

        default:
            return state;
    }
};


