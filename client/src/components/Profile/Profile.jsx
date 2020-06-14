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
        name={props.name}
        surname={props.surname}
        city={props.city}
        country={props.country}
        updateStatus={props.updateStatus}
        updateName={props.updateName}
        updateSurname={props.updateSurname}
        updateCity={props.updateCity}
        updateCountry={props.updateCountry}
      />

      <MyPostsContainer
        profile={props.profile}
        userId={props.match.params.userId}
      />
    </div>
  );
}

export default Profile;