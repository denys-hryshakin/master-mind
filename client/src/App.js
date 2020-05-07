import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import FriendListContainer from './components/FriendList/FriendListContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from './components/Users/UsersContainer';
import PortalsContainer from './components/Portals/PortalsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Register from './components/Header/Register/Register';
import Login from './components/Header/Login/Login';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Header/Dashboard/Dashboard";
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/actions";

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
          <NavbarContainer />
          <div className="app-wrapper-content">
            <Route path="/register" render={() => <Register />} />
            <Route path="/login" render={() => <Login />} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/profile/:userId?" component={ProfileContainer} />
            </Switch>
            <Route path="/dialogs"
              render={() => <DialogsContainer />} />
            <Route path="/news"
              render={() => <div />} />
            <Route path="/music"
              render={() => <div />} />
            <Route path="/portals"
              render={() => <PortalsContainer />} />
            <Route path="/users"
              render={() => <UsersContainer />} />
            <Route path="/friends"
              render={() => <FriendListContainer />} />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;