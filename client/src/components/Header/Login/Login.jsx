import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/actions";
import './Login.css';
import classnames from 'classnames';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.login.isAuthenticated !== this.props.login.isAuthenticated) {
            let userId = this.props.login.user.id
            this.props.history.push(`/profile/` + userId);
        }
        if (prevProps.errors !== this.props.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to profile
        if (this.props.login.isAuthenticated) {
            let userId = this.props.login.user.id
            this.props.history.push(`/profile/` + userId);
            alert("You already have an account!")
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    };
    render() {  
        const { errors } = this.state;
        return (
            <div className={`loginMain ${this.props.login.isAuthenticated ? "" : "width"}`}>
                <div>
                    <h1><b>Sign in</b></h1>
                    <p>Don't have an account? <NavLink to="/register">Register</NavLink></p>
                </div>
                <form className='loginForm' noValidate onSubmit={this.onSubmit}>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                            })}
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                        <label htmlFor="email"></label>
                        <span className='errorMessage'>
                            {errors.email}
                            {errors.emailnotfound}
                        </span>
                    </div>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            className={classnames("", {
                                invalid: errors.password || errors.passwordincorrect
                            })}
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                        <label htmlFor="password"></label>
                        <span className='errorMessage'>
                            {errors.password}
                            {errors.passwordincorrect}
                        </span>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    login: state.login,
    errors: state.errors
});
export default withRouter(connect(
    mapStateToProps,
    { loginUser }
)(Login));