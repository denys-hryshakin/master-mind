import React from 'react';
import styles from './Post.module.css';
import avatar from './../../../../assets/images/avatar.jpg'


const Post = (props) => {
  return (
    <div className={styles.item}>
      <img className={styles.avatar} src={avatar} alt="user" />
      {props.message}
      <div>
        <span>Likes {props.likesCount}</span>
      </div>
    </div>
  );
}

export default Post;