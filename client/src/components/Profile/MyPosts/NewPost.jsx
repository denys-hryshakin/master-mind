import React from 'react';
import classnames from 'classnames';
import styles from './MyPosts.module.css'
import { connect } from 'react-redux';
import { addPost } from '../../../redux/actions/actions'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

class NewPost extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            text: "",
            userId: "",
            errors: {}
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const newPost = {
            title: this.state.title,
            userId: this.state.userId,
            text: this.state.text,
        };
        this.props.addPost(newPost);
    };
    // onSubmit = e => {
    //     e.preventDefault();
    //     axios.post(`http://localhost:4000/api/posts/new/` + this.props.userId)
    //         .then(res => {
    //             this.props.addPost(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    // onTitleChange = e => {
    //     let postTitle = e.target.value;
    //     this.props.updatePostTitle(postTitle);
    // };
    // onTextChange = e => {
    //     let postText = e.target.value;
    //     this.props.updatePostText(postText);
    // };
    render() {
        const { errors } = this.state;
        return (
            <div className={styles.newPostBlock}>
                <h2>Create a new post:</h2>
                <form noValidate onSubmit={this.onSubmit} className={styles.newPostForm} >
                    <div>
                        <input 
                        id="title" 
                        onChange={this.onChange} 
                        value={this.state.title} 
                        type="text"
                        error={errors.title} 
                        placeholder="Title of post"
                        className={classnames("", {
                            invalid: errors.title
                        })} />
                        <div className='errorMessage'>{errors.title}</div>
                    </div>
                    <div>
                        <input 
                        id="userId" 
                        onChange={this.onChange} 
                        value={this.state.userId} 
                        type="text" placeholder="UserId of post"
                        className={classnames("", {
                            invalid: errors.userId
                        })} />
                        <div className='errorMessage'>{errors.userId}</div>
                    </div>
                    <div>
                        <textarea 
                        className={classnames("", {
                            invalid: errors.text
                        })} 
                        id="text"
                        error={errors.text} 
                        onChange={this.onChange} 
                        value={this.state.text} 
                        cols="30" rows="5"
                        placeholder="Text of post" />
                        <div className='errorMessage'>{errors.text}</div>
                    </div>
                    <div>
                        <button className={styles.btnAddPost} type="submit">Add Post</button>
                    </div>
                </form>
            </div>
        )
    }
}
NewPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
let mapStateToProps = (state) => {
    return {
        profile: state.profilePage,
        login: state.login,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { addPost })(withRouter(NewPost));