import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from '../../../redux/actions/actions'
import PropTypes from "prop-types";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            first_name: "",
            second_name: "",
            email: "",
            login: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }
    componentWillReceiveProps(nextProps) {
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
            second_name: this.state.second_name,
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
            <div>
                <div>
                    <h4>
                        <b>Register</b> below
                    </h4>
                    <p>
                        Already have an account? <NavLink to="/login">Sign in</NavLink>
                    </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.first_name}
                            error={errors.first_name}
                            id="first_name"
                            type="text"
                        />
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.second_name}
                            error={errors.second_name}
                            id="second_name"
                            type="text"
                        />
                        <label htmlFor="second_name">Second Name</label>
                    </div>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.login}
                            error={errors.login}
                            id="login"
                            type="text"
                        />
                        <label htmlFor="login">Login</label>
                    </div>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <input
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            id="password2"
                            type="password"
                        />
                        <label htmlFor="password2">Confirm Password</label>
                    </div>
                    <div>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            type="submit"
                        >
                            Sign up
                </button>
                    </div>
                </form>
            </div>
        );
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));