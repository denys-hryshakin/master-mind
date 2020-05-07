import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { registerUser } from '../../../redux/actions/actions';
import classnames from 'classnames';
import styles from './Register.module.css'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            first_name: "",
            surname: "",
            email: "",
            login: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.login.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
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
        const newUser = {
            first_name: this.state.first_name,
            surname: this.state.surname,
            email: this.state.email,
            login: this.state.login,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className={styles.registerMain}>
                <div>
                    <h1><b>Create a new account</b></h1>
                    <p>Already have an account? <NavLink to="/login">Sign in</NavLink></p>
                </div>
                <form className={styles.registerForm} noValidate onSubmit={this.onSubmit}>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.first_name}
                            error={errors.first_name}
                            placeholder="First name"
                            id="first_name"
                            type="text"
                            className={classnames("", {
                                invalid: errors.first_name
                            })}
                        />
                        <label htmlFor="first_name"></label>
                        <span className={styles.errorMessage}>{errors.first_name}</span>
                    </div>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.surname}
                            error={errors.surname}
                            placeholder="Surname"
                            id="surname"
                            type="text"
                            className={classnames("", {
                                invalid: errors.surname
                            })}
                        />
                        <label htmlFor="surname"></label>
                        <span className={styles.errorMessage}>{errors.surname}</span>
                    </div>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            placeholder="Email"
                            id="email"
                            type="email"
                            className={classnames("", {
                                invalid: errors.email
                            })}
                        />
                        <label htmlFor="email"></label>
                        <span className={styles.errorMessage}>{errors.email}</span>
                    </div>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.login}
                            error={errors.login}
                            placeholder="Login"
                            id="login"
                            type="text"
                            className={classnames("", {
                                invalid: errors.login
                            })}
                        />
                        <label htmlFor="login"></label>
                        <span className={styles.errorMessage}>{errors.login}</span>
                    </div>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            placeholder="Password"
                            id="password"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password
                            })}
                        />
                        <label htmlFor="password"></label>
                        <span className={styles.errorMessage}>{errors.password}</span>
                    </div>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            placeholder="Confirm password"
                            id="password2"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password2
                            })}
                        />
                        <label htmlFor="password2"></label>
                        <span className={styles.errorMessage}>{errors.password2}</span>
                    </div>
                    <div>
                        <button type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    login: state.login,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));