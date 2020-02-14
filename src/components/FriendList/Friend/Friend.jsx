import React from 'react';
import styles from './Friend.module.css';
import avatar from './../../../images/avatar2.jpg';
import { NavLink } from 'react-router-dom';

const Friend = (props) => {

  return (
    <div className={styles.friend}>
      <NavLink to={"/friends/" + props.id}><img src={avatar} alt="navbarAvatar" /></NavLink>
      <div className={styles.friendInfo}>
        <NavLink to={"/friends/" + props.id}>{props.name}</NavLink>
        <div className={styles.lastSeen}>{props.time}</div>
        <div className={styles.description}>
          <p>description</p>
        </div>
      </div>
    </div>
  );
}

export default Friend;