import React from 'react';
import logo from './../../assets/images/logo-1.png'
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import avatar from '../../assets/images/avatar.jpg'

const Header = (props) => {
    let onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img className={styles.logo} src={logo} alt="logo" />
                <div className={styles.loginBlock}>
                    {props.login.isAuthenticated
                        ? <div className={styles.loginInfo}>    
                            <NavLink to={`/profile/` + props.login.user.id}><img className={styles.miniAvatar} src={avatar} alt="avatar" /></NavLink>
                            <NavLink to={`/profile/` + props.login.user.id} className={styles.login}>{props.login.user.login}</NavLink>
                            <span>|</span>
                            <button onClick={onLogoutClick}>Logout</button>
                        </div>
                        : <div className={styles.loginInfo}>
                            <NavLink className={styles.sign} to={'/login'}>Sign in</NavLink>
                            <span>|</span>
                            <NavLink className={styles.sign} to={'/register'}>Sign up</NavLink>
                        </div>}
                </div>
            </div>
        </header>
    );
}

export default Header;