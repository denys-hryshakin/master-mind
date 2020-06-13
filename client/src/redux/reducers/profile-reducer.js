import { deleteAPI, profileAPI } from "../actions/actions";

// PROFILE
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

// POSTS
const SET_POSTS = 'SET-POSTS';
const DELETE_POST = 'DELETE-POST';
const SET_USER_POST = 'SET-USER-POST';

// COMMENTS
const SET_COMMENTS = 'SET-COMMENTS';

// STATE
let initialState = {
    posts: [],
    profile: [],
    post: [],
    comments: [],
    status: "",
};

// REDUCER
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_POST: return { ...state, post: action.post };
        case SET_USER_PROFILE: return { ...state, profile: action.profile };
        case SET_POSTS: return { ...state, posts: action.posts }
        case SET_COMMENTS: return { ...state, comments: action.comments }
        case SET_STATUS: return { ...state, status: action.status }
        case DELETE_POST: return { ...state, posts: state.posts.filter(i => i.id !== action.id) }
        default: return state;
    }
}

// ACTIONS
export const setUserPost = (post) => ({ type: SET_USER_POST, post });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setComments = (comments) => ({ type: SET_COMMENTS, comments });
export const setPosts = (posts) => ({ type: SET_POSTS, posts });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const deletePost = (id) => ({ type: DELETE_POST, id: id })


// REQUESTS
export const deletePostReq = (id) => {
    return (dispatch) => {
        deleteAPI.deletePostReq(id)
            .then(data => {
                dispatch(deletePost(data._id))
            })
    }
}
export const getUserProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId)
        .then(res => {
            dispatch(setUserProfile(res.profile))
        })
}
export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(res => {
            dispatch(setStatus(res.data.status))
        })
}
export const updateStatus = (userId, status) => (dispatch) => {
    profileAPI.updateStatus(userId, status)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}

export default profileReducer;