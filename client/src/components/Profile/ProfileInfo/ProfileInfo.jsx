import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import avatar from './../../../assets/images/avatar.jpg';
import bc from './../../../assets/images/b-c.jpg';
import styles from './ProfileInfo.module.css';
import { NavLink } from 'react-router-dom';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={styles.editProfile}>
        <NavLink to={`/edit/` + props.profile._id}>Edit Profile</NavLink>
      </div>
      <div className={styles.backgroundImage}>
        <img className={styles.bc} src={bc} alt="bc"></img>
      </div>
      <div className={styles.profileHeader}>
        <div className={styles.avatarImage}>
          <div className={styles.updateImage}>
            <NavLink to={`/edit/` + props.profile._id}>Update Image</NavLink>
          </div>
          <img className={styles.avatar} src={avatar} alt="avatar"></img>
        </div>
        <div className={styles.shortInfo}>
          <div className={styles.profileInfo}>
            <div>{props.profile.first_name} {props.profile.surname}</div>
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
        {!props.profile.city
          ? <span>User hasn't set information yet.</span>
          : <div><div>{props.profile.city}</div><div>{props.profile.facebook}</div><div>{props.profile.instagram}</div></div>}
      </div>
    </div>
  );
}

export default ProfileInfo;