import React from 'react';
import styles from './../Navbar.module.css';
import { NavLink } from 'react-router-dom';
import avatar1 from './../../../assets/images/unknown_user1.png'

const FriendsBar = (props) => {
    return (
            <div className={styles.friendItem}>
                <NavLink to={"/friends/" + props.id}><img src={avatar1} alt="navbarAvatar" /></NavLink>
                <NavLink to={"/friends/" + props.id}>{props.name}</NavLink>
            </div>
    );
}

export default FriendsBar;