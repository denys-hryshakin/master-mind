const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 34352 },
        { id: 2, message: 'It is my first message!', likesCount: 23334 },
        { id: 3, message: 'Hello, World!', likesCount: 20123 }
    ],
    newPostText: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: 
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                newPostText: '',
                posts: [newPost, ...state.posts]
            };
        case UPDATE_NEW_POST_TEXT: 
            return {
                ...state,
                newPostText: action.newText
            };
        default:
            return state;
    }
}

export const addPost = () => ({ type: ADD_POST });
export const updateNewPostText = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export default profileReducer;