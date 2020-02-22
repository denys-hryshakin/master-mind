import React from 'react';
import styles from './Users.module.css'
import avatar from './../../assets/images/avatar2.jpg'
import { NavLink } from 'react-router-dom';

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
                props.users.map(u => <div key={u.id}>
                    <div className={styles.mediaBlock}>
                        <div>
                            <div className={styles.userImg}>
                                <NavLink to={'/profile/' + u.id}>
                                    <img className={styles.userPhoto}
                                        src={u.photos.small != null ? u.photos.small : avatar} alt="" />
                                </NavLink>
                            </div>
                        </div>
                        <div>
                            {u.followed
                                ? <button className={styles.btnUsers} onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button className={styles.btnUsers} onClick={() => { props.follow(u.id) }}>Follow</button>}
                        </div>
                    </div>
                    <div className={styles.userInfoBlock}>
                        <div>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </div>
                        <div>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>);
}

export default Users;
