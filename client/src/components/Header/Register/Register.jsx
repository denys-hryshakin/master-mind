import classnames from 'classnames';
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { registerUser } from '../../../redux/actions/actions';
import './Register.css';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
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
            let userId = this.props.login.user.id;
            this.props.history.push(`/profile/` + userId);
            alert("You already have an account!")
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
            name: this.state.name,
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
            <div className="container">
                <div className={`registerMain ${this.props.login.isAuthenticated ? "" : ""}`}>
                    <div>
                        <h1><b>Create a new account</b></h1>
                    </div>
                    <form className='registerForm' noValidate onSubmit={this.onSubmit}>
                        <div>
                            <input
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name}
                                placeholder="First name"
                                id="name"
                                type="text"
                                className={classnames("", {
                                    invalid: errors.name
                                })}
                                autoFocus
                            />
                            <label htmlFor="name"></label>
                            <div className='errorMessage'>{errors.name}</div>
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
                            <div className='errorMessage'>{errors.surname}</div>
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
                            <div className='errorMessage'>{errors.email}</div>
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
                            <div className='errorMessage'>{errors.login}</div>
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
                            <div className='errorMessage'>{errors.password}</div>
                        </div>
                        <div>
                            <input
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                placeholder="Re-enter password"
                                id="password2"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password2
                                })}
                            />
                            <label htmlFor="password2"></label>
                            <div className='errorMessage'>{errors.password2}</div>  
                        </div>
                        <div>
                            <button type="submit">Sign up</button>
                        </div>
                    </form>
                    <p>Already have an account? <NavLink to="/login">Sign in</NavLink></p>
                </div>
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