import { createStore, combineReducers } from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import friendsbarReducer from "./friendsbar-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer from "./users-reducer";
import portalsReducer from "./portals-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsReducer,
    sidebar: friendsbarReducer,
    usersPage: usersReducer,
    portalsPage: portalsReducer
});

let store = createStore(reducers);

window.store = store;

export default store;