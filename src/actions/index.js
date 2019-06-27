import {databaseRef} from "../config/fbConfig";
import history from '../history'
import {ADD_ARTICLE, FETCH_NEWS, FETCH_ARTICLE, SIGN_IN, SIGN_OUT, EDIT_ARTICLE} from "./types";

export const Sign_In = (user) => {
    return {
        type: SIGN_IN,
        payload: user
    }
};

export const Sign_Out = () => {
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

export const addNews = (articleId,newArticle) => async (dispatch) => {
    dispatch({
        type: ADD_ARTICLE,
        payload: databaseRef.ref('news/' + articleId).set(newArticle)
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

export const editArticle = (articleId, newArticle) => async dispatch => {
    var updates = {};
    var newPostKey = databaseRef.ref().child('news').push().key;
    updates['news/' + newPostKey] = newArticle

    console.log('UPDATES',updates)
    console.log('Child',databaseRef.ref('news/' + articleId).update(newArticle))
    console.log(newArticle)
    dispatch({
        type: EDIT_ARTICLE,
        payload: databaseRef.ref('news/test-6o188').update(newArticle)
    });
};