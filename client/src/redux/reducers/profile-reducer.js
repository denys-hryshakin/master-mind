const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_POSTS = 'SET-POSTS';

let initialState = {
    posts: [],
    title: "",
    text: "",
    profile: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [action.postData, ...state.posts]
            };
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };
        case SET_POSTS:
            return { ...state, posts: action.posts }
        default:
            return state;
    }
}

export const addPost = (title, text) => ({ type: ADD_POST, postData: {title, text} });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setPosts = (posts) => ({ type: SET_POSTS, posts });


export default profileReducer;