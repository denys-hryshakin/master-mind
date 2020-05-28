import React from 'react';
import './MyPosts.css';
import Post from './Post/Post';
import { NavLink } from 'react-router-dom';

const MyPosts = (props) => {
  let postsElements = props.profile.posts.map(p => <Post deletePost={props.onClick}
    key={p.id} post={p} user={p.userId} />);

  return (
    <div className="container-block">
      <div className="postsBlock">
        <div className={`${props.login.user.id === props.userId ? "NavLink" : "display"}`}>
          <NavLink to={'/new-post'}>Create a new post</NavLink>
        </div>
        <div className="posts">
          {postsElements}
        </div>
      </div>
    </div>
  );
}

export default MyPosts;