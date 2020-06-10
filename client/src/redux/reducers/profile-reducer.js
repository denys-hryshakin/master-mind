import { deleteAPI } from "../actions/actions";

const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_POSTS = 'SET-POSTS';
const DELETE_POST = 'DELETE-POST';
const SET_USER_POST = 'SET-USER-POST';
const SET_COMMENTS = 'SET-COMMENTS';

let initialState = {
    posts: [],
    title: "",
    text: "",
    userId: "",
    profile: [],
    post: [],
    comments: [],
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_POST:
            return { ...state, post: action.post };
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };
        case SET_POSTS:
            return { ...state, posts: action.posts }
        case SET_COMMENTS:
            return { ...state, comments: action.comments }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(i => i.id !== action.id) }
        default:
            return state;
    }
}

export const setUserPost = (post) => ({ type: SET_USER_POST, post });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setComments = (comments) => ({ type: SET_COMMENTS, comments });
export const setPosts = (posts) => ({ type: SET_POSTS, posts });
export const deletePost = (id) => ({ type: DELETE_POST, id: id })


export const deletePostReq = (id) => {
    return (dispatch) => {
        deleteAPI.deletePostReq(id)
            .then(data => {
                dispatch(deletePost(data._id))
            })
    }
}

export default profileReducer;