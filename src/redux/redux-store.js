import { combineReducers, createStore } from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import friendsbarReducer from "./friendsbar-reducer";
import portalsReducer from "./portals-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsReducer,
    sidebar: friendsbarReducer,
    usersPage: usersReducer,
    portalsPage: portalsReducer,
    auth: authReducer
});

let store = createStore(reducers);

window.store = store;

export default store;