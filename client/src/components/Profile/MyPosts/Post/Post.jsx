import React from 'react';
import styles from './Post.module.css';
import avatar from './../../../../assets/images/avatar.jpg'


const Post = (props) => {
  return (
    <div className={styles.item}>
      <div><img className={styles.avatar} src={avatar} alt="user" /></div>
      <div className={styles.postInfo}>
        <div>{props.first_name}</div>
        <div>{props.title}</div>
        <div>{props.text}</div>
        <div><span>{props.likesCount}</span></div>
      </div>
    </div>
  );
}

export default Post;