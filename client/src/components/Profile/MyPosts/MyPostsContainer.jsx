import { connect } from 'react-redux';
import { addPost, setPosts } from '../../../redux/reducers/profile-reducer';
import MyPosts from './MyPosts';
import React from 'react';
import * as axios from 'axios'

class MyPostsContainer extends React.Component {
  componentDidMount() {
    axios.get(`http://localhost:4000/api/posts/userPosts/` + this.props.userId)
      .then(response => {
        this.props.setPosts(response.data.posts);
      });
    axios.post(`http://localhost:4000/api/posts/newPost/` + this.props.userId)
      .then(response => {
        this.props.addPost(response.data);
      });
  }

  render() {
    return (
      <div>
        <MyPosts {...this.props}
          posts={this.props.posts}
          profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    login: state.login,

  }
}

export default connect(mapStateToProps, { addPost, setPosts })(MyPostsContainer);