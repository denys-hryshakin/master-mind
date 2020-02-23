import React from 'react';
// eslint-disable-next-line
import avatar from './../../../assets/images/avatar2.jpg'
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
          <img className={styles.avatar} src={props.profile.photos.large} alt="avatar"></img>
        </div>
        <div className={styles.shortInfo}>
          <div className={styles.profileInfo}>
            <div>{props.profile.fullName}</div>
          </div>
          <div className={styles.profileInfo}>
            <div>{props.profile.aboutMe}</div>
          </div>
          <div className={styles.profileInfo}>
            <div>{props.profile.lookingForAJob
              ? props.profile.lookingForAJobDescription
              : props.profile.contacts.github}</div>
          </div>
        </div>
      </div>
      <div className={styles.fullInfo}>
        <h2>Full Description</h2>
        <div>{props.profile.contacts.facebook}</div>
        <div>{props.profile.contacts.website}</div>
        <div>{props.profile.contacts.vk}</div>
        <div>{props.profile.contacts.instagram}</div>
        <div>{props.profile.contacts.twitter}</div>
      </div>
    </div>
  );
}

export default ProfileInfo;