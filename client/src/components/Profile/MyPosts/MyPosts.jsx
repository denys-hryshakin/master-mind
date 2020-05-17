import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import { NavLink } from 'react-router-dom';

const MyPosts = (props) => {
  let postsElements = props.profile.posts.map(p => <Post
    key={p.id} title={p.title} text={p.text} first_name={p.userId.first_name} userId={p.userId._id} />);

  // let state = props.profile;
  // let newPostTitle = state.posts.title;
  // let newPostText = state.posts.text

  return (
    <div className={styles.container}>
      <div className={styles.postsBlock}>
        <div>
          <NavLink to={'/new-post'}>Create a new post</NavLink>
        </div>
        <div className={styles.posts}>
          <h2>Posts</h2>
          {postsElements}
        </div>
      </div>
    </div>
  );
}

export default MyPosts;