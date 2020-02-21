import React from 'react';
import styles from './Users.module.css';
import * as axios from 'axios';
import avatar from './../../assets/images/avatar2.jpg'

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }
    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return (
            <div className={styles.item}>
                <div className={styles.spans}>
                    {pages.map(p => {
                        return <span className={this.props.currentPage === p && styles.selectedPage}
                            onClick={() => { this.onPageChanged(p) }}>{p}</span>
                    })}
                </div>
                {
                    this.props.users.map(u => <div key={u.id}>
                        <div className={styles.mediaBlock}>
                            <div>
                                <div className={styles.userImg}>
                                    <img className={styles.userPhoto}
                                        src={u.photos.small != null ? u.photos.small : avatar} alt="" />
                                </div>
                            </div>
                            <div>
                                {u.followed
                                    ? <button className={styles.btnUsers} onClick={() => { this.props.unfollow(u.id) }}>Unfollow</button>
                                    : <button className={styles.btnUsers} onClick={() => { this.props.follow(u.id) }}>Follow</button>}
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
}

export default Users;