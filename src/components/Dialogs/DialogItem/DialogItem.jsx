import React from 'react';
import styles from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import avatar from './../../../images/avatar2.jpg';

const DialogItem = (props) => {
    return (
        <div className={styles.dialog + ' ' + styles.active}>
            <NavLink to={"/dialogs/" + props.id}><img src={avatar} alt="avatar" /></NavLink>
            <div className={styles.dialogItemInfo}>
                <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
                <div className={styles.lastSeen}>{props.time}</div>
            </div>
        </div>
    );
}

export default DialogItem;