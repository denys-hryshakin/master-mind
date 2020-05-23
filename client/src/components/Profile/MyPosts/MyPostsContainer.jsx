import React from 'react';
import { connect } from 'react-redux';
import { deletePostReq, getPosts } from '../../../redux/actions/actions';
import { setPosts } from '../../../redux/reducers/profile-reducer';
import MyPosts from './MyPosts';

class MyPostsContainer extends React.Component {
  refreshPosts() {
    let userId = this.props.userId;
    getPosts(userId)
      .then(data => {
        this.props.setPosts(data.posts);
      });
  }
  componentDidMount() {
    this.refreshPosts()
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