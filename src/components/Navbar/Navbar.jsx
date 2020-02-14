import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import FriendsBar from './FriendsBar/FriendsBar';

const Navbar = (props) => {

    let state = props.sidebar;
    let friendsBarElements = state.friendsbar.map(f => <FriendsBar name={f.name} key={f.id} id={f.id} />);

    return (
        <nav className={styles.nav}>
            <div className={styles.item}>
                <NavLink to="/profile" activeClassName={styles.active}>Profile</NavLink>
            </div>
            <div className={`${styles.item} ${styles.active}`}>
                <NavLink to="/dialogs" activeClassName={styles.active}>Messages</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/news" activeClassName={styles.active}>News</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/music" activeClassName={styles.active}>Music</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/portals" activeClassName={styles.active}>Portals</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/users" activeClassName={styles.active}>Find Users</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/friends" activeClassName={styles.active}>Friends</NavLink>
                {friendsBarElements}
            </div>
        </nav>
    );
}

export default Navbar;