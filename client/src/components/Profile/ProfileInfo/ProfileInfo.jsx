import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import avatar from './../../../assets/images/avatar.jpg';
import bc from './../../../assets/images/b-c.jpg';
import './ProfileInfo.css';
import { NavLink } from 'react-router-dom';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div className="container-block">
      <div className="backgroundImage">
        <img className="bc" src={bc} alt="bc"></img>
        <div className={`${props.login.user.id === props.userId ? "editBackgroundImage" : "display"}`}>
          <NavLink to={`/edit/background/` + props.profile._id}>Update Background Image</NavLink>
        </div>
      </div>
      <div className="profileHeader">
        <div className="avatarImage">
          <div className={`${props.login.user.id === props.userId ? "updateImage" : "display"}`}>
            <NavLink to={`/edit/avatar/` + props.profile._id}>Update Image</NavLink>
          </div>
          <img className="avatar" src={avatar} alt="avatar"></img>
        </div>
        <div className="shortInfo">
          <div className="profileInfo">
            <div>{props.profile.first_name} {props.profile.surname}</div>
          </div>
          <div className="profileInfo">
            <div>{props.profile.status}</div>
          </div>
          <div className="profileInfo">
            <div>{props.profile.country}</div>
          </div>
        </div>
      </div>
      <div className="fullInfo">
        <h2>Full Description</h2>
        {!props.profile.city
          ? <span>User hasn't set information yet.</span>
          : <div><div>{props.profile.city}</div><div>{props.profile.facebook}</div><div>{props.profile.instagram}</div></div>}
      </div>
    </div>
  );
}

export default ProfileInfo;