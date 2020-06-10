import React from 'react';
import styles from './UserPost.module.css';
import { connect } from 'react-redux';
import { setUserPost, setComments } from '../../../../../redux/reducers/profile-reducer'
import { getPost, getComments, profileAPI } from '../../../../../redux/actions/actions';
import UserPost from './UserPost';

class UserPostContainer extends React.Component {
    state = {
        text: "",
        userId: "",
        postId: "",
    }
    refreshPage() {
        let postId = this.props.match.params.postId
        getPost(postId)
            .then(data => {
                this.props.setUserPost(data)
            })
        getComments(postId)
            .then(data => {
                this.props.setComments(data.comments)
            })
    }
    componentDidMount() {
        this.refreshPage()
    }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevProps)
    //     console.log(this.props)
    //     if(prevProps.comments !== this.props.comments){
    //         this.refreshPage()
    //     }
    // }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const newComment = {
            postId: this.props.match.params.postId,
            userId: this.props.login.user.id,
            text: this.state.text,
        };
        profileAPI.sendComment(newComment);
        this.setState({
            text: '',
        })
    };

    render() {
        return (
            <div className={styles.containerBlock}>
                <UserPost
                    {...this.props}
                    login={this.props.login}
                    post={this.props.post}
                    comments={this.props.comments}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    text={this.state.text} />
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        login: state.login,
        post: state.profilePage.post,
        comments: state.profilePage.comments
    }
}

export default connect(mapStateToProps, { setUserPost, setComments, profileAPI })(UserPostContainer);

