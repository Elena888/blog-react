import {databaseRef} from "../config/fbConfig";
import history from '../history'
import {
    CREATE_ARTICLE_ERROR,
    CREATE_ARTICLE_SUCCESS,
    FETCH_NEWS,
    FETCH_ARTICLE,
    SIGN_IN,
    SIGN_OUT,
    EDIT_ARTICLE_SUCCESS,
    EDIT_ARTICLE_ERROR,
    DELETE_ARTICLE} from "./types";

export const SignIn = (user) => {
    return {
        type: SIGN_IN,
        payload: user
    }
};

export const SignOut = () => {
    return {
        type: SIGN_OUT
    }
};

export const fetchNews = () => async dispatch => {
    databaseRef.ref('news').once('value')
        .then((snapshot) => {
            dispatch({
                type: FETCH_NEWS,
                payload: snapshot.val()
            })
        })
};

export const createArticle = (articleId, newArticle) => async (dispatch, getState) => {
    const timestamp = new Date().getTime();
    const userName = getState().auth.user.name;
    const userId = getState().auth.user.userId;

    databaseRef.ref('news/' + articleId)
        .set({
            ...newArticle,
            timestamp,
            userName,
            userId
        }).then(() => {
                dispatch({
                    type: CREATE_ARTICLE_SUCCESS,
                    payload: newArticle
                })
            }
        ).catch((err) => {
            dispatch({
                type: CREATE_ARTICLE_ERROR,
                payload: err
            })
    });
    history.push('/')
};

export const fetchArticle = (articleId) => async dispatch => {
    databaseRef.ref(`news/${articleId}`).once('value')
        .then(function (snapshot) {
            let data = snapshot.val();
            //console.log('data', data)
            dispatch({
                type: FETCH_ARTICLE,
                payload: data
            })
        });
};

export const editArticle = (articleId, newArticle) => async (dispatch, getState) => {
    const timestamp = new Date().getTime();
    const userName = getState().auth.user.name;
    const userId = getState().auth.user.userId;
    databaseRef.ref('news/' + articleId)
        .set({
            ...newArticle,
            timestamp,
            userName,
            userId
        }).then(() => {
                dispatch({
                    type: EDIT_ARTICLE_SUCCESS,
                    payload: newArticle
                })
            }
        ).catch((error) => {
            dispatch({
                type: EDIT_ARTICLE_ERROR,
                payload: error
            })
    })
};
export const deleteArticle = (articleId) => async dispatch => {
    databaseRef.ref('news/' + articleId)
        .remove()
        .then(() => {
            dispatch({
                type: DELETE_ARTICLE,
                payload: articleId
            });
        })
};