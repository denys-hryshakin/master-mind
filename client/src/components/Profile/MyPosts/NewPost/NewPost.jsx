import React from 'react';
import classnames from 'classnames';
import styles from './NewPost.module.css'
import { connect } from 'react-redux';
import { addPost, uploadPhoto } from '../../../../redux/actions/actions'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

class NewPost extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            text: "",
            userId: "",
            errors: {},
            selectedFile: null
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
            userId: this.props.login.user.id,
            text: this.state.text,
        };
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        this.props.addPost(newPost, this.props.history);
    };
    onChangeHandler = e => {
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0,
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <div className={styles.container}>
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
                            <input type="file" id="file" name="file" onChange={this.onChangeHandler} />
                        </div>
                        <div>
                            <button className={styles.btnAddPost} type="submit">Add Post</button>
                        </div>
                    </form>
                </div>
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

export default connect(mapStateToProps, { addPost, uploadPhoto })(withRouter(NewPost));