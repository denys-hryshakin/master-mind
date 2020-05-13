import React from 'react';
import preloader from '../../../assets/images/preloader.svg';
import styles from './Preloader.module.css'

let Preloader = props => {
    return (
        <div className={styles.container}>
            <div className={styles.preloader}>
                <img src={preloader} alt="" />
                <h1>Information is loading!</h1>
            </div>
        </div>

    );
}

export default Preloader;