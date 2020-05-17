import { connect } from 'react-redux';
import { addPost, setPosts, updatePostText, updatePostTitle } from '../../../redux/reducers/profile-reducer';
import MyPosts from './MyPosts';
import React from 'react';
import * as axios from 'axios'

class MyPostsContainer extends React.Component {
  componentDidMount() {
    axios.get(`http://localhost:4000/api/posts/userPosts/` + this.props.userId)
      .then(response => {
        this.props.setPosts(response.data.posts);
      });
  }
  // onSubmit = e => {
  //   e.preventDefault();
  //   axios.post(`http://localhost:4000/api/posts/newPost/` + this.props.userId)
  //     .then(res => {
  //       this.props.addPost(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
      
  // }

  // onTitleChange = e => {
  //   let postTitle = e.target.value;
  //   this.props.updatePostTitle(postTitle);
  // };
  // onTextChange = e => {
  //   let postText = e.target.value;
  //   this.props.updatePostText(postText);
  // };

  render() {
    return (
      <div>
        <MyPosts {...this.props}
          profile={this.props.profile}
          login={this.props.login} />
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

export default connect(mapStateToProps, { addPost, setPosts, updatePostTitle, updatePostText })(MyPostsContainer);