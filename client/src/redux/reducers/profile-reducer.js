import { deleteAPI, profileAPI } from "../actions/actions";

// ACTION TYPES /////////////////////////////////////////////////////////////////////////////////////////
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SET_NAME = 'SET-NAME';
const SET_SURNAME = 'SET-SURNAME';
const SET_CITY = 'SET-CITY';
const SET_COUNTRY = 'SET-COUNTRY';
const SET_POSTS = 'SET-POSTS';
const DELETE_POST = 'DELETE-POST';
const SET_USER_POST = 'SET-USER-POST';
const SET_COMMENTS = 'SET-COMMENTS';

// STATE /////////////////////////////////////////////////////////////////////////////////////////
let initialState = {
    posts: [],
    profile: [],
    post: [],
    comments: [],
    status: "",
    name: "",
    surname: "",
    city: "",
    country: "",
};

// REDUCER /////////////////////////////////////////////////////////////////////////////////////////
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_POST: return { ...state, post: action.post };
        case SET_USER_PROFILE: return { ...state, profile: action.profile };
        case SET_POSTS: return { ...state, posts: action.posts }
        case SET_COMMENTS: return { ...state, comments: action.comments }
        case SET_STATUS: return { ...state, status: action.status }
        case SET_NAME: return { ...state, name: action.name }
        case SET_SURNAME: return { ...state, surname: action.surname }
        case SET_CITY: return { ...state, city: action.city }
        case SET_COUNTRY: return { ...state, country: action.country }
        case DELETE_POST: return { ...state, posts: state.posts.filter(i => i.id !== action.id) }
        default: return state;
    }
}

// ACTIONS /////////////////////////////////////////////////////////////////////////////////////////
export const setPosts = (posts) => ({ type: SET_POSTS, posts });
export const setUserPost = (post) => ({ type: SET_USER_POST, post });
export const deletePost = (id) => ({ type: DELETE_POST, id: id })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setComments = (comments) => ({ type: SET_COMMENTS, comments });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const setName = (name) => ({ type: SET_NAME, name });
export const setSurname = (surname) => ({ type: SET_SURNAME, surname });
export const setCity = (city) => ({ type: SET_CITY, city });
export const setCountry = (country) => ({ type: SET_COUNTRY, country });

// POSTS /////////////////////////////////////////////////////////////////////////////////////////
export const deletePostReq = (id) => {
    return (dispatch) => {
        deleteAPI.deletePostReq(id)
            .then(data => {
                dispatch(deletePost(data._id))
            })
    }
}



// POSTS /////////////////////////////////////////////////////////////////////////////////////////
export const sendComment = (newComment) => (dispatch) => {
    profileAPI.sendComment(newComment)
}



// PROFILE /////////////////////////////////////////////////////////////////////////////////////////
export const getUserProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId)
        .then(res => {
            dispatch(setUserProfile(res.profile))
        })
}



// STATUS /////////////////////////////////////////////////////////////////////////////////////////
export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(res => {
            dispatch(setStatus(res.data.status))
        })
}
export const updateStatus = (userId, status) => (dispatch) => {
    profileAPI.updateStatus(userId, status)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatus(res.data.status))
            }
        })
}



// NAME /////////////////////////////////////////////////////////////////////////////////////////
export const getName = (userId) => (dispatch) => {
    profileAPI.getName(userId)
        .then(res => {
            dispatch(setName(res.data.name))
        })
}
export const updateName = (userId, name) => (dispatch) => {
    profileAPI.updateName(userId, name)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setName(res.data.name))
            }
        })
}



// SURNAME /////////////////////////////////////////////////////////////////////////////////////////
export const getSurname = (userId) => (dispatch) => {
    profileAPI.getSurname(userId)
        .then(res => {
            dispatch(setSurname(res.data.surname))
        })
}
export const updateSurname = (userId, surname) => (dispatch) => {
    profileAPI.updateSurname(userId, surname)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setSurname(res.data.surname))
            }
        })
}


// CITY /////////////////////////////////////////////////////////////////////////////////////////
export const getCity = (userId) => (dispatch) => {
    profileAPI.getCity(userId)
        .then(res => {
            dispatch(setCity(res.data.city))
        })
}
export const updateCity = (userId, city) => (dispatch) => {
    profileAPI.updateCity(userId, city)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setCity(res.data.city))
            }
        })
}


// COUNTRY /////////////////////////////////////////////////////////////////////////////////////////
export const getCountry = (userId) => (dispatch) => {
    profileAPI.getCountry(userId)
        .then(res => {
            dispatch(setCountry(res.data.country))
        })
}
export const updateCountry = (userId, country) => (dispatch) => {
    profileAPI.updateCountry(userId, country)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setCountry(res.data.country))
            }
        })
}


export default profileReducer;