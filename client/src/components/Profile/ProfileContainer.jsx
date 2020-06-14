import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
  getUserProfile, getStatus, updateStatus, updateName, updateSurname,
  updateCity, updateCountry, getCity, getCountry, getName, getSurname
} from '../../redux/reducers/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
    this.props.getName(userId);
    this.props.getSurname(userId);
    this.props.getCity(userId);
    this.props.getCountry(userId);
  }
  componentDidMount() {
    this.refreshProfile()
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }
  render() {
    return (
      <div>
        <Profile
          {...this.props}
          profile={this.props.profile}
          login={this.props.login}
          status={this.props.status}
          name={this.props.name}
          surname={this.props.surname}
          city={this.props.city}
          country={this.props.country}
          updateStatus={this.props.updateStatus}
          updateName={this.props.updateName}
          updateSurname={this.props.updateSurname}
          updateCity={this.props.updateCity}
          updateCountry={this.props.updateCountry}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    login: state.login,
    status: state.profilePage.status,
    name: state.profilePage.name,
    surname: state.profilePage.surname,
    city: state.profilePage.city,
    country: state.profilePage.country
  }
}

export default compose(
  connect(mapStateToProps,
    {
      getUserProfile, getStatus, updateStatus,
      updateName, updateSurname, updateCity,
      updateCountry, getName, getSurname,
      getCity, getCountry
    }),
  withRouter
)(ProfileContainer);