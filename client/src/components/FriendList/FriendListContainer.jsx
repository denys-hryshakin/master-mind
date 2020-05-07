import FriendList from './FriendList';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    friendsPage: state.friendsPage
  }
}
let mapDispatchToProps = () => {
  return {

  }
}
const FriendListContainer = connect(mapStateToProps, mapDispatchToProps)(FriendList);

export default FriendListContainer;