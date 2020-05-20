import classnames from 'classnames';
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { updateUser } from '../../../redux/actions/actions';
import './ProfileSettings.css';

class ProfileSettings extends React.Component {
    constructor() {
        super();
        this.state = {
            first_name: "",
            surname: "",
            email: "",
            login: "",
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
        const newUser = {
            id: this.props.match.params.userId,
            first_name: this.state.first_name,
            surname: this.state.surname,
            email: this.state.email,
            login: this.state.login,
        };
        this.props.updateUser(newUser, this.props.history);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className={`registerMain ${this.props.login.isAuthenticated ? "" : ""}`}>
                    <div>
                        <h1><b>Update an account information</b></h1>
                    </div>
                    <form className='registerForm' noValidate onSubmit={this.onSubmit}>
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
                                autoFocus
                            />
                            <label htmlFor="first_name"></label>
                            <div className='errorMessage'>{errors.first_name}</div>
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
                            <button type="submit">Sign up</button>
                        </div>
                    </form>
                    <p>Already have an account? <NavLink to="/login">Sign in</NavLink></p>
                </div>
            </div>
        );
    }
}

ProfileSettings.propTypes = {
    registerUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    login: state.login,
    errors: state.errors
});

export default connect(mapStateToProps, { updateUser })(withRouter(ProfileSettings));