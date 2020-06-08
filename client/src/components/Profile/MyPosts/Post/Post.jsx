import React, { useEffect, useState } from 'react';
import styles from './Post.module.css';
import avatar from './../../../../assets/images/avatar.jpg'
import { NavLink } from 'react-router-dom';

const Post = (props) => {
  const [isLogin, setLogin] = useState(false)
    // eslint-disable-next-line
    useEffect(() => {
        if (props.login === props.user._id) {
          setLogin(true)
        } else {
          setLogin(false)
        }
  })
  if(!isLogin) {
    return (
<div className={styles.item}>
      <div><img className={styles.avatar} src={avatar} alt="user" /></div>
      <div className={styles.postInfo}>
        <div className={styles.userInfo}>
          <div className={styles.name}>{props.user.name} {props.user.surname}</div>
          <div className={styles.login}>( @{props.user.login} )</div>
        </div>
        <NavLink to={`/post/`+ props.post._id} className={styles.title}>{props.post.title}</NavLink>
        <div className={styles.text}>{props.post.text}</div>
        <div className={styles.btnBlock}>
          <div className={styles.date}>Created: {props.post.date}</div>
        </div>
      </div>
    </div>
    );
  } else {
    return (
      <div className={styles.item}>
      <div><img className={styles.avatar} src={avatar} alt="user" /></div>
      <div className={styles.postInfo}>
        <div className={styles.userInfo}>
          <div className={styles.name}>{props.user.name} {props.user.surname}</div>
          <div className={styles.login}>( @{props.user.login} )</div>
        </div>
        <NavLink title="Read post" to={`/post/${props.post._id}`} className={styles.title}>{props.post.title}</NavLink>
        <div className={styles.text}>{props.post.text}</div>
        <div className={styles.btnBlock}>
          <div className={styles.date}>Created: {props.post.date}</div>
          <div className={styles.NavLink}>
            <NavLink to={`/update-post/${props.user._id}/${props.post._id}`}>Update Post</NavLink>
          </div>
          <div>
            <button onClick={(e) => { props.deletePost(e, props.post._id) }} className={styles.btnDeletePost} type="button">Delete Post</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Post;