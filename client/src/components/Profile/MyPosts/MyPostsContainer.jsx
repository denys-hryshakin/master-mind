import { connect } from 'react-redux';
import { addPost, updateNewPostText, setPosts } from '../../../redux/reducers/profile-reducer';
import MyPosts from './MyPosts';
import React from 'react';
import * as axios from 'axios'

class MyPostsContainer extends React.Component {
  componentDidMount() {
    axios.get(`http://localhost:4000/api/posts/userPosts`)
        .then(response => {
            this.props.setPosts(response.data.posts);
        });
}
  render() {
    return (
      <div>
        <MyPosts
          posts={this.props.posts} />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    login: state.login
   
  }
}

export default connect(mapStateToProps, { updateNewPostText, addPost, setPosts })(MyPostsContainer);