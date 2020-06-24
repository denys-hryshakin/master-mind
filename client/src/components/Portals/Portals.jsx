import React from 'react';
import styles from './Portals.module.css';
import avatar from './../../assets/images/bbc-logo.jpg'

let Portals = (props) => {
    return (
        <div className={styles.page}>
            {
                props.portals.map(p => <div key={p.id}>
                    <div className={styles.mediaBlock}>
                        <div className={styles.imgBlock}>
                            <img className={styles.portalPhoto} src={avatar} alt="" />
                        </div>
                        <div className={styles.btnBlock}>
                            {p.followed
                                ? <button className={styles.btnPortals} onClick={() => { props.unfollow(p.id) }}>Unfollow</button>
                                : <button className={styles.btnPortals} onClick={() => { props.follow(p.id) }}>Follow</button>}
                        </div>
                        <div className={styles.portalInfoBlock}>
                            <div>{p.namel}</div>
                            <div>{p.status}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>);
}

export default Portals;