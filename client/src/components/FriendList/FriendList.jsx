import React from 'react';
import styles from './FriendList.module.css';
import Friend from './Friend/Friend';

const FriendList = (props) => {
  let state = props.friendsPage;
  let friendListElements = state.friendlist.map(f => <Friend name={f.name} id={f.id} time={f.time} />);

  return (
    <div className={styles.friends}>
      {friendListElements}
    </div>
  );
}

export default FriendList;