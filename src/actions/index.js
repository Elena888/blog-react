import {databaseRef} from "../config/fbConfig";
import history from '../history'
import {CREATE_ARTICLE, FETCH_NEWS, FETCH_ARTICLE, SIGN_IN, SIGN_OUT, EDIT_ARTICLE, DELETE_ARTICLE} from "./types";

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
    databaseRef.ref('news').orderByChild('timestamp').on('value',
        function (snapshot) {
            let data = [];
            snapshot.forEach(function(child) {
                data.unshift(child.val());
            });
            dispatch({
                type: FETCH_NEWS,
                payload: data
            })
        }
    );
};

export const createArticle = (articleId,newArticle) => async (dispatch) => {
    databaseRef.ref('news/' + articleId)
        .set(newArticle)
        .then(() => {
                dispatch({
                    type: CREATE_ARTICLE,
                    payload: newArticle
                })
            }
        );
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

export const editArticle = (articleId, newArticle) => async dispatch => {
    databaseRef.ref('news/' + articleId)
        .set(newArticle)
        .then(() => {
                dispatch({
                    type: EDIT_ARTICLE,
                    payload: newArticle
                })
            },
            (error) => {
                dispatch({
                    type: EDIT_ARTICLE,
                    payload: error
                })
            }
        )
};
export const deleteArticle = (articleId) => async dispatch => {
    databaseRef.ref('news/' + articleId)
        .remove()
        .then(() => {
            dispatch({
                type: DELETE_ARTICLE
            });
        })
};