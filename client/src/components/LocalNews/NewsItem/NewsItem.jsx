import React, { useState, useEffect } from 'react'
import styles from './NewsItem.module.css'
import avatar from '../../../assets/images/bbc-logo.jpg'

const NewsItem = props => {
    const [isLocal, setLocal] = useState(false)
    // eslint-disable-next-line
    useEffect(() => {
        if (props.profile.geoData.city === props.news.city) {
            setLocal(true)
        } else {
            setLocal(false)
        }
    })
    if (!isLocal) {
        return <div></div>
    } else {
        return (
            <div className={styles.item}>
                <div><img className={styles.avatar} src={avatar} alt="user" /></div>
                <div className={styles.postInfo}>
                    <div className={styles.userInfo}>
                        <div className={styles.name}>{props.news.sourceName}</div>
                        <div className={styles.login}>( @{props.news.link} )</div>
                    </div>
                    <div className={styles.title}>{props.news.title}</div>
                    <div className={styles.text}>{props.news.text}</div>
                    <div className={styles.text}>{props.news.city}</div>    
                    <div className={styles.btnBlock}>
                        <div className={styles.date}>Created: {props.news.date}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;