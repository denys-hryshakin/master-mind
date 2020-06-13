import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
  return (
    <div className={styles.container}>
      <ProfileInfo
        profile={props.profile}
        userId={props.match.params.userId}
        login={props.login}
        status={props.status}
        updateStatus={props.updateStatus} />

      <MyPostsContainer
        profile={props.profile}
        userId={props.match.params.userId} />
    </div>
  );
}

export default Profile;