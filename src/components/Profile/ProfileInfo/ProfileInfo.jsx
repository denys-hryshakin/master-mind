import React from 'react';
import avatar from './../../../images/avatar2.jpg'
import bc from './../../../images/b-c.jpg'
import styles from './ProfileInfo.module.css';

const ProfileInfo = () => {
  return (
    <div>
      <div className={styles.backgroundImage}>
        <img className={styles.bc} src={bc} alt="bc"></img>
      </div>
      <div className={styles.profileHeader}>
        <div className={styles.avatarImage}>
          <img className={styles.avatar} src={avatar} alt="avatar"></img>
        </div>
        <div>
          <div className={styles.profileInfo}>
            Dennis Gryshakin
        </div>
          <div className={styles.profileInfo}>
            Hello, World!
        </div>
          <div className={styles.profileInfo}>
            Odessa, Ukraine
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;