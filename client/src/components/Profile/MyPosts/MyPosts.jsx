import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  let postsElements = props.posts.map(p => <Post
    key={p.id} title={p.title} text={p.text} first_name={p.userId.first_name} userId={p.userId._id} />);

  let newPostElement = React.createRef();
  let newTitleElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  }
  let onTitleChange = () => {
    let titleText = newTitleElement.current.value;
    props.updateNewPostTitle(titleText);
  }

  return (
    <div className={styles.container}>
      <div className={styles.postsBlock}>
        <div className={styles.newPostBlock}>
          <h2>Create a new post:</h2>
          <form className={styles.newPostForm}>
            <div>
              <input onChange={onTitleChange} ref={newTitleElement} type="text" name="postName" id="postName" placeholder="Title of post" value={props.newPostTitle} />
            </div>
            <div>
              <textarea onChange={onPostChange} ref={newPostElement} cols="30" rows="5" placeholder="Text of post" value={props.newPostText} />
            </div>
          </form>
          <div>
            <button className={styles.btnAddPost} onClick={onAddPost}>Add Post</button>
          </div>
        </div>
        <div className={styles.posts}>
          <h2>Posts</h2>
          {postsElements}
        </div>
      </div>
    </div>
  );
}

export default MyPosts;