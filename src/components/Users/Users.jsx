import React from 'react';
import styles from './Users.module.css';
import * as axios from 'axios';
import avatar from './../../assets/images/avatar2.jpg'

let Users = props => {
    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                    props.setUsers(response.data.items);
                });
        }
    }
    return (
        <div className={styles.item}>
        <button onClick={getUsers}>Get Users</button>
            {
                props.users.map(u => <div key={u.id}>
                    <div className={styles.mediaBlock}>
                        <div>
                            <div className={styles.userImg}>
                                <img className={styles.userPhoto} src={u.photos.small != null ? u.photos.small : avatar} alt="" />
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