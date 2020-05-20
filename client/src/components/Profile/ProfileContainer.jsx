import React from 'react';
import * as axios from 'axios';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUserProfile, setAvatar } from '../../redux/reducers/profile-reducer';
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
    axios.get(`http://localhost:4000/api/avatar/`+ userId)
      .then(response => {
        this.props.setAvatar(response.data)
      })
  }
  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} login={this.props.login} avatar={this.props.avatar} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  login: state.login,
  avatar: state.profilePage.avatar
})

let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile, setAvatar })(withUrlDataContainerComponent);