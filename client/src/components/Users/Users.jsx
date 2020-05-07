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
        <div className={styles.page}>
            <div className={styles.pagesCount}>
                {pages.map(p => {
                    return <span className={`${styles.pagesCount} ${props.currentPage === p && styles.selectedPage}`}
                        onClick={() => { props.onPageChanged(p) }}>{p}</span> 
                })}
            </div>
            {
                props.users.map(u => <div key={u._id}>
                    <div className={styles.mediaBlock}>
                        <div>
                            <div className={styles.userImg}>
                                <NavLink to={'/profile/' + u._id}>
                                    <img className={styles.userPhoto}
                                        src={u.image != null ? u.image : avatar1} alt="" />
                                </NavLink>
                            </div>
                        </div>
                        <div>
                            {u.followed
                                ? <button className={styles.btnUsers} onClick={() => { props.unfollow(u._id) }}>Unfollow</button>
                                : <button className={styles.btnUsers} onClick={() => { props.follow(u._id) }}>Follow</button>}
                        </div>
                    </div>
                    <div className={styles.userInfoBlock}>
                        <div>
                            <div>{u.first_name} {u.surname}</div>
                            <div>{u.status}</div>
                        </div>
                        <div>
                            <div>{u.country}</div>
                            <div>{u.city}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>);
}

export default Users;
