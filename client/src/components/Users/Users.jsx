import React from 'react';
import { NavLink } from 'react-router-dom';
import avatar1 from './../../assets/images/unknown_user1.png';
import styles from './Users.module.css';

let Users = props => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className={styles.container}>
            <div className={styles.page}>
                <div className={styles.pagesCount}>
                    {pages.map(p => {
                        return <span className={`${styles.pagesCount} ${props.currentPage === p && styles.selectedPage}`}
                            onClick={() => { props.onPageChanged(p) }}>{p}...</span>
                    })}
                </div>
                {
                    props.users.map(u => <div key={u._id}>
                        <div className={styles.userBlock}>
                            <div className={styles.userImg}>
                                <NavLink to={'/profile/' + u._id}>
                                    <img className={styles.userPhoto}
                                        src={u.image != null ? u.image : avatar1} alt="" />
                                </NavLink>
                            </div>
                            <div className={styles.userInfoBlock}>
                                <NavLink to={'/profile/'+u._id}>{u.first_name} {u.surname}</NavLink>
                                <div>{u.status}</div>
                                <div>{u.country} {u.city}</div>
                            </div>
                        </div>
                    </div>)
                }
                <div className={styles.pagesCount}>
                    {pages.map(p => {
                        return <span className={`${styles.pagesCount} ${props.currentPage === p && styles.selectedPage}`}
                            onClick={() => { props.onPageChanged(p) }}>{p}...</span>
                    })}
                </div>
            </div>
        </div>);
}

export default Users;
