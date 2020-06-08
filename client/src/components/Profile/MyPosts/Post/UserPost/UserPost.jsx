import React from 'react';
import styles from './UserPost.module.css'
import TEST_IMAGE from '../../../../../assets/images/test-image.jpg'
import Comment from './Comment/Comment'

const UserPost = (props) => {

    let commentsElements = props.comments.map(c => <Comment key={c.id} comments={c} />)
    return (
        <div className={styles.postMain}>
            <div className={styles.postsBlock}>
                <div className={styles.title}>{props.post.title}</div>
                <div className={styles.text}>{props.post.text}</div>
                <div className={styles.postImg}><img src={TEST_IMAGE} alt="POST_IMAGE" /></div>
                <div className={styles.userInfoBlock}>
                    <div>Author: </div>
                    <div className={styles.name}>{props.post.userName}</div>
                    <div className={styles.name}>{props.post.userSurname}</div>
                    <div className={styles.login}>@({props.post.userLogin})</div>
                </div>
                <div className={styles.date}>{props.post.date}</div>
            </div>
            <div className={styles.commentsArea}>
                <form onSubmit={props.onSubmit}>
                    <div>
                        <textarea value={props.text} id="text" rows="2" className={styles.inptComment} required onChange={props.onChange} placeholder="Input a comment" />
                    </div>
                    <div>
                        <button className={styles.btnAddComment}>Send a comment</button>
                    </div>
                </form>
            </div>
            <div className={styles.commentsElements}>
                {commentsElements}
            </div>
        </div>
    );
}

export default UserPost;
