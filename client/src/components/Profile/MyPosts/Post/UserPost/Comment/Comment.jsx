import React from 'react';
import styles from './Comment.module.css';
import img from '../../../../../../assets/images/avatar.jpg';
import alert from '../../../../../../assets/images/exclamation-circle-solid.svg';
import { NavLink } from 'react-router-dom';

let Comment = (props) => {

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.img}><img src={img} alt="" /></div>
                <div className={styles.info}>
                    <div className={styles.user}>
                        <div className={styles.name}>{props.comments.userId.name}</div>
                        <div className={styles.name}>{props.comments.userId.surname}</div>
                        <div className={styles.date}>{props.comments.date}</div>
                    </div>
                    <div className={styles.text}>{props.comments.text}</div>
                </div>
            </div>
            <NavLink to={'/'} title="To complain a comment" className={styles.alert}><img src={alert} alt=""/></NavLink>
        </div>
    );
}

export default Comment;
