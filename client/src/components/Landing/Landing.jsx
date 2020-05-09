import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Landing.css"
import { NavLink } from "react-router-dom";
import { setCurrentUser } from '../../redux/actions/actions'

class Landing extends Component {

    render() {
        return (
            <div className={`main ${this.props.login.isAuthenticated ? "" : "width"}`}>
                <h1>Welcome to the MasterMind!</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div className='info'>To find useful news and communicate with people, you need to <NavLink to={'/register'}><b>create a new account</b></NavLink>.</div>
                <div className='info'>If you are already have an account, you can <NavLink to={'/login'}><b>sign in </b></NavLink>.</div>
            </div>
        );
    }
}
Landing.propTypes = {
    login: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    login: state.login
});
export default connect(
    mapStateToProps,
    { setCurrentUser }
)(Landing);