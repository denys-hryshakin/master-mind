import jwt_decode from "jwt-decode";
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import FriendListContainer from './components/FriendList/FriendListContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Header/Login/Login';
import Register from './components/Header/Register/Register';
import Landing from "./components/Landing/Landing";
import NavbarContainer from './components/Navbar/NavbarContainer';
import PortalsContainer from './components/Portals/PortalsContainer';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { logoutUser, setCurrentUser } from "./redux/actions/actions";
import store from './redux/redux-store';
import setAuthToken from "./utils/setAuthToken";
import ProfileSettings from "./components/Profile/ProfileSettings/ProfileSettings";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // store.dispatch(setUserLoading())
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="app-wrapper">
          <HeaderContainer />
          <PrivateRoute component={NavbarContainer} />
          <div className="app-wrapper-content">
            <Route path="/register" render={() => <Register />} />
            <Route path="/login" render={() => <Login />} />
            <Switch>
              <PrivateRoute path="/profile/edit/:userId?" component={ProfileSettings} />
              <PrivateRoute path="/profile/:userId?" component={ProfileContainer} />
              <PrivateRoute path="/dialogs" component={DialogsContainer} />
              <PrivateRoute path="/portals" component={PortalsContainer} />
              <PrivateRoute path="/users" component={UsersContainer} />
              <PrivateRoute path="/friends" component={FriendListContainer} />
            </Switch>
            <Route exact path="/" render={()=> <Landing /> } />
            <Route path="/news" render={()=> <div /> } />
            <Route path="/music" render={()=> <div /> } />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;