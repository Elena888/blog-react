import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import {news, article}  from "./NewsReducer";

export default combineReducers({
    auth: AuthReducer,
    news: news,
    article: article
})