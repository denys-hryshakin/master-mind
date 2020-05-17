const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_POSTS = 'SET-POSTS';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const UPDATE_POST_TITLE = 'UPDATE-POST-TITLE';

let initialState = {
    posts: [],
    post: {},
    title: "",
    text: "",
    userId: "",
    profile: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts]
            };
        case UPDATE_POST_TITLE:
            return {
                ...state,
                title: action.title
            };
        case UPDATE_POST_TEXT:
            return {
                ...state,
                text: action.text
            };
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };
        case SET_POSTS:
            return { ...state, posts: action.posts }
        default:
            return state;
    }
}

export const addPost = () => ({ type: ADD_POST });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setPosts = (posts) => ({ type: SET_POSTS, posts });
export const updatePostTitle = (title) => ({ type: UPDATE_POST_TITLE, title: title });
export const updatePostText = (text) => ({ type: UPDATE_POST_TEXT, text: text });


export default profileReducer;