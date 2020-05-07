import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/actions";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    componentDidUpdate(prevProps){
        if(prevProps.login.isAuthenticated !== this.props.login.isAuthenticated){
           this.props.history.push("/dashboard");
        }
     
        if (prevProps.errors !== this.props.errors) {
           this.setState({
             errors: this.props.errors
           });
         }
     }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.login.isAuthenticated) {
            this.props.history.push("/dashboard");
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
            <div>
                <div>
                    <h4>
                        <b>Login</b> below
                    </h4>
                    <p>
                        Don't have an account? <NavLink to="/register">Register</NavLink>
                    </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
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
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <button
                            type="submit"
                        >
                            Login
                </button>
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