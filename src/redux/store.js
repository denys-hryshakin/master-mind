import dialogsReducer from "./reducers/dialogs-reducer";
import profileReducer from "./reducers/profile-reducer";
import friendsbarReducer from "./reducers/friendsbar-reducer";
import friendsReducer from "./reducers/friends-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likesCount: 34352 },
                { id: 2, message: 'It is my first message!', likesCount: 23334 },
                { id: 3, message: 'Hello, World!', likesCount: 20123 }
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Andrey', time: 'Last seen at 13:50' },
                { id: 2, name: 'Genadiy', time: 'Last seen at 09:25' },
                { id: 3, name: 'Denis', time: 'Last seen at 08:12' },
                { id: 4, name: 'Dima', time: 'Last seen at 12:55' },
                { id: 5, name: 'Vadim', time: 'Last seen at 15:30' },
                { id: 6, name: 'Loren', time: 'Last seen at 16:00' }
            ],
            messages: [
                { id: 1, message: 'Hello!' },
                { id: 2, message: 'Hi' },
                { id: 3, message: 'How are you?' },
                { id: 4, message: 'Yeeeeep' },
                { id: 5, message: 'This is awesome!' },
                { id: 6, message: 'Are you kidding me?' }
            ],
            newMessageBody: ""
        },
        friendsPage: {
            friendlist: [
                { id: 1, name: 'Dennis', time: 'Last seen at 13:50' },
                { id: 2, name: 'Vadim', time: 'Last seen at 09:25' },
                { id: 3, name: 'Dima', time: 'Last seen at 08:12' },
                { id: 3, name: 'Dima', time: 'Last seen at 08:12' },
                { id: 3, name: 'Dima', time: 'Last seen at 08:12' },
                { id: 3, name: 'Dima', time: 'Last seen at 08:12' },
                { id: 3, name: 'Dima', time: 'Last seen at 08:12' },
                { id: 3, name: 'Dima', time: 'Last seen at 08:12' },
                { id: 3, name: 'Dima', time: 'Last seen at 08:12' },
                { id: 3, name: 'Dima', time: 'Last seen at 08:12' }
            ]
        },
        sidebar: {
            friendsbar: [
                { id: 1, name: 'Dennis' },
                { id: 2, name: 'Vadim' },
                { id: 3, name: 'Dima' }
            ]
        }
    },
    _callSubscriber() {
        console.log('State changed!');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;   //патерн Наблюдлатель - observer // publisher-subscriber
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.friendsPage = friendsReducer(this._state.friendsPage, action);
        this._state.friendsbar = friendsbarReducer(this._state.friendsbar, action);

        this._callSubscriber(this._state);
    }
}

export default store;