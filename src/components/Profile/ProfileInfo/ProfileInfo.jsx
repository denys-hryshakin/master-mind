import React from 'react';
// eslint-disable-next-line
import avatar1 from './../../../assets/images/unknown_user1.png'
import avatar from './../../../assets/images/avatar.jpg'
import bc from './../../../assets/images/b-c.jpg'
import styles from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={styles.backgroundImage}>
        <img className={styles.bc} src={bc} alt="bc"></img>
      </div>
      <div className={styles.profileHeader}>
        <div className={styles.avatarImage}>
          <img className={styles.avatar} src={avatar} alt="avatar"></img>
        </div>
        <div className={styles.shortInfo}>
          <div className={styles.profileInfo}>
            <div>{props.profile.name}</div>
          </div>
          <div className={styles.profileInfo}>
            <div>{props.profile.status}</div>
          </div>
          <div className={styles.profileInfo}>
            <div>{props.profile.country}</div>
          </div>
        </div>
      </div>
      <div className={styles.fullInfo}>
        <h2>Full Description</h2>
        <div>{props.profile.city}</div>
        <div>{props.profile.facebook}</div>
        <div>{props.profile.instagram}</div>
      </div>
    </div>
  );
}

export default ProfileInfo;