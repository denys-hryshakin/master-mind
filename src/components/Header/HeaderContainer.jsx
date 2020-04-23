import React from 'react';
import Header from './Header';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../redux/auth-reducer'

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`http://localhost:4000/api/auth/me`, {
            withCredentials: true,
        })
            .then(response => {
                    let { id, email, login } = response.data.data;
                    this.props.setAuthUserData(id, email, login);
            });
    }
    render() {
        return (
            <Header {...this.props} />
        );
    }
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);