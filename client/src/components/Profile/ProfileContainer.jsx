import React from 'react';
import * as axios from 'axios';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/reducers/profile-reducer';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.login.user.id;
    }
    axios.get(`/api/users/profile/` + userId)
      .then(response => {
        this.props.setUserProfile(response.data.profile);
      });
  }
  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  login: state.login
})

let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(withUrlDataContainerComponent);