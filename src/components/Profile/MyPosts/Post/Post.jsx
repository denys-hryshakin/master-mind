import React from 'react';
import styles from './Post.module.css';
import avatar from 'D:/Project/React/react-insp-1/src/assets/images/avatar2.jpg';

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