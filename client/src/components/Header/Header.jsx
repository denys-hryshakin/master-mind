import React from 'react';
import logo from './../../assets/images/logo-1.png'
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={styles.header}>
            <img src={logo} alt="logo" />

            <div className={styles.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'/login'}>Sign in</NavLink>}
                <span> | </span>
                <NavLink to={'/register'}>Sign up</NavLink>
            </div>
        </header>
    );
}

export default Header;