import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
// import FriendsBar from './FriendsBar/FriendsBar';

const Navbar = (props) => {

    // let state = props.sidebar;
    // let friendsBarElements = state.friendsbar.map(f => <FriendsBar name={f.name} key={f.id} id={f.id} />);
    let userId = props.login.user.id;

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.item}>
                    <NavLink to={`/profile/` + userId} activeClassName={styles.active}>Profile</NavLink>
                </div>
                <div className={`${styles.item} ${styles.active}`}>
                    <NavLink to="/dialogs" activeClassName={styles.active}>Messages</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to="/geolocation" activeClassName={styles.active}>Geolocation</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to="/news/local" activeClassName={styles.active}>Local News</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to="/categories" activeClassName={styles.active}>Categories</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to="/portals" activeClassName={styles.active}>Portals</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to="/users" activeClassName={styles.active}>Users</NavLink>
                </div>
                
                { /*<div className={styles.item}>
                <NavLink to="/friends" activeClassName={styles.active}>Friends</NavLink>
                <div className={styles.friendsbar}>
                    {friendsBarElements}
                </div>
    </div> */}
            </div>
        </nav>

    );
}

export default Navbar;