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
            <div className="container">
                <div className="loginMain">
                    <div className="loginBlock">
                        <h1><b>Sign in</b></h1>
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
                                    autoFocus
                                />
                                <label htmlFor="email"></label>
                                <div className='errorMessage'>
                                    {errors.email}
                                    {errors.emailnotfound}
                                </div>
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
                                <div className='errorMessage'>
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </div>
                            </div>
                            <div>
                                <button type="submit">Login</button>
                            </div>
                        </form>
                        <p>Don't have an account? <NavLink to="/register">Sign up</NavLink></p>
                    </div>
                    <div className="benefitsBlock">
                        <h1>Benefits of using MasterMind</h1>
                        <h3>Personalized Recommendations</h3>
                        <p>Discover shows you'll love.</p>
                        <h3>Your Watchlist</h3>
                        <p>Track everything you want to watch and receive e-mail when movies open in theaters.</p>
                        <h3>Your Ratings</h3>
                        <p>Rate and remember everything you've seen.</p>
                        <h3>Contribute to IMDb</h3>
                        <p>Add data that will be seen by millions of people and get cool badges.</p>
                    </div>
                </div>
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