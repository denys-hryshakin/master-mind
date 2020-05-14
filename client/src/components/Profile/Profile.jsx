import React from 'react';
// eslint-disable-next-line
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
  return (
    <div className={styles.container}>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer profile={props.profile} userId={props.match.params.userId} />
    </div>
  );
}

export default Profile;