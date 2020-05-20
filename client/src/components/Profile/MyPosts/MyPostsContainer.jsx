import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { setPosts } from '../../../redux/reducers/profile-reducer';
import { deletePostReq } from '../../../redux/actions/actions';
import MyPosts from './MyPosts';

class MyPostsContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.userId;
    if (!userId) {
      userId = this.props.login.user.id;
    }
    axios.get(`http://localhost:4000/api/posts/` + userId)
      .then(response => {
        this.props.setPosts(response.data.posts);
      });
  }
  onClick = (e, id) => {
    e.preventDefault();
    this.props.deletePostReq(id)
    window.location.reload();
  }

  render() {
    return (
      <div>
        <MyPosts {...this.props}
          profile={this.props.profile}
          login={this.props.login}
          onClick={this.onClick} />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage,
    login: state.login,

  }
}

export default connect(mapStateToProps, { setPosts, deletePostReq })(MyPostsContainer);