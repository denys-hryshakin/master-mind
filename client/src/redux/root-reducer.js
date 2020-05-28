import { combineReducers } from 'redux'
import authReducer from "./reducers/auth-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";
import friendsReducer from "./reducers/friends-reducer";
import friendsbarReducer from "./reducers/friendsbar-reducer";
import portalsReducer from "./reducers/portals-reducer";
import profileReducer from "./reducers/profile-reducer";
import usersReducer from "./reducers/users-reducer";
import loginReducer from "./reducers/login-reducer";
import errorsReducer from "./reducers/errors-reducer";
import newsReducer from "./reducers/news-reducer";

export default combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsReducer,
    sidebar: friendsbarReducer,
    usersPage: usersReducer,
    portalsPage: portalsReducer,
    auth: authReducer,
    login: loginReducer,
    errors: errorsReducer,
    newsPage: newsReducer,

});