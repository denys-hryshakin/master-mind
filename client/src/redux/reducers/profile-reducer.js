const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_POST_TITLE = 'UPDATE-NEW-POST-TITLE';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const EDIT_USER_PROFILE = 'EDIT-USER-PROFILE';
const SET_POSTS = 'SET-POSTS';

let initialState = {
    posts: [],
    profile: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            // let newPost = {
            //     id: 5,
            //     title: state.newPostTitle,
            //     message: state.newPostText,
            //     likesCount: 0
            // };
            return {
                ...state,
                posts: action.payload
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };
        case UPDATE_NEW_POST_TITLE:
            return {
                ...state,
                newPostTitle: action.newTitle,
            };
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };
        case EDIT_USER_PROFILE:
            return { ...state}
        case SET_POSTS:
            return { ...state, posts: action.posts}
        default:
            return state;
    }
}

export const addPost = () => ({ type: ADD_POST });
export const updateNewPostText = (text) => ({ type: UPDATE_NEW_POST_TEXT,  newText: text  });
export const updateNewPostTitle = (title) => ({ type: UPDATE_NEW_POST_TITLE,  newTitle: title  });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setPosts = (posts) => ({ type: SET_POSTS, posts });


export default profileReducer;