import React from 'react';
import styles from './Portals.module.css';

let Portals = (props) => {
    if (props.portals.length === 0) {
        props.setPortals([
            {
                id: 1,
                photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/512px-Fox_News_Channel_logo.svg.png',
                followed: true,
                name: 'Fox News',
                description: 'Hello, World!'
            },
            {
                id: 2,
                photoUrl: 'https://d302e0npexowb4.cloudfront.net/wp-content/uploads/2016/11/NBC-News-Logo.png',
                followed: false,
                name: 'NBC News',
                description: 'Hello, World!'
            },
            {
                id: 3,
                photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Polsat_News_Logo.svg',
                followed: false,
                name: 'Polsat News',
                description: 'Hello, World!'
            },
            {
                id: 4,
                photoUrl: 'https://logoeps.com/wp-content/uploads/2014/05/21601-news-logo-icon-vector-icon-vector-eps.png',
                followed: true,
                name: 'News',
                description: 'Hello, World!'
            },
            {
                id: 5,
                photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/CBC_News_Logo.svg/1200px-CBC_News_Logo.svg.png',
                followed: true,
                name: 'CBC News',
                description: 'Hello, World!'
            },
            {
                id: 5,
                photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/CBC_News_Logo.svg/1200px-CBC_News_Logo.svg.png',
                followed: true,
                name: 'CBC News',
                description: 'Hello, World!'
            },
            {
                id: 5,
                photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/CBC_News_Logo.svg/1200px-CBC_News_Logo.svg.png',
                followed: true,
                name: 'CBC News',
                description: 'Hello, World!'
            }
        ])
    }
    return (
        <div className={styles.page}>
            {
                props.portals.map(p => <div key={p.id}>
                    <div className={styles.mediaBlock}>
                        <div className={styles.imgBlock}>
                            <img className={styles.portalPhoto} src={p.photoUrl} alt="" />
                        </div>
                        <div className={styles.btnBlock}>
                            {p.followed
                                ? <button className={styles.btnPortals} onClick={() => { props.unfollow(p.id) }}>Unfollow</button>
                                : <button className={styles.btnPortals} onClick={() => { props.follow(p.id) }}>Follow</button>}
                        </div>
                        <div className={styles.portalInfoBlock}>
                            <div>{p.name}</div>
                            <div>{p.description}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>);
}

export default Portals;