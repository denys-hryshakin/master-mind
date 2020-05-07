import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/actions/actions";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.login;
        return (
            <div>
                <div>
                    <h4>
                        <b>Hey there,</b> {user.first_name}
                        <p>
                            You are logged into a full-stack{" "}
                            <span>MERN</span> app
              </p>
                    </h4>
                    <button
                        onClick={this.onLogoutClick}
                    >
                        Logout
            </button>
                </div>
            </div>
        );
    }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    login: state.login
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);