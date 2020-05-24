import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/reducers/profile-reducer';
import { withRouter } from 'react-router-dom';
import { profileAPI } from '../../redux/actions/actions';

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    profileAPI.getProfile(userId)
      .then(data => {
        this.props.setUserProfile(data.profile);
      });
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
          login={this.props.login} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  login: state.login,
})

let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(withUrlDataContainerComponent);