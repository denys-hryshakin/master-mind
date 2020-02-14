import React from 'react';
import styles from './Users.module.css';

let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'http://localhost:3000/static/media/avatar2.d86f9d68.jpg',
                followed: true,
                fullname: 'Andrey',
                time: 'Last seen at 13:50',
                status: 'Status #1',
                location: { city: 'Odessa', country: 'Ukraine' }
            },
            {
                id: 2,
                photoUrl: 'http://localhost:3000/static/media/avatar2.d86f9d68.jpg',
                followed: false,
                fullname: 'Genadiy',
                time: 'Last seen at 09:25',
                status: 'Status #2',
                location: { city: 'Minsk', country: 'Belarus' }
            },
            {
                id: 3,
                photoUrl: 'http://localhost:3000/static/media/avatar2.d86f9d68.jpg',
                followed: true,
                fullname: 'Denis',
                time: 'Last seen at 08:12',
                status: 'Status #3',
                location: { city: 'Kiev', country: 'Ukraine' }
            },
            {
                id: 4,
                photoUrl: 'http://localhost:3000/static/media/avatar2.d86f9d68.jpg',
                followed: false,
                fullname: 'Dima',
                time: 'Last seen at 12:55',
                status: 'Status #4',
                location: { city: 'Lviv', country: 'Ukraine' }
            }
        ])
    }
    return (
        <div className={styles.item}>
            {
                props.users.map(u => <div key={u.id}>
                    <div className={styles.mediaBlock}>
                        <div>
                            <div className={styles.userImg}>
                                <img className={styles.userPhoto} src={u.photoUrl} alt="" />
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
                            <div>{u.fullname}</div>
                            <div>{u.status}</div>
                        </div>
                        <div>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>);
}

export default Users;