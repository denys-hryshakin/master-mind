import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser, logoutUser } from '../../redux/actions/actions'
import PropTypes from 'prop-types'
import Header from './Header'

class HeaderContainer extends React.Component {

    render() {
        return (
            <Header {...this.props} />
        );
    }
}
HeaderContainer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    login: state.login
});
export default connect(
    mapStateToProps,
    { logoutUser, setCurrentUser }
)(HeaderContainer);

// class HeaderContainer extends React.Component {
//     // componentDidMount() {
//     //     axios.get(`http://localhost:4000/api/auth/me`, {
//     //         withCredentials: true,
//     //     })
//     //         .then(response => {
//     //                 let { id, email, login } = response.data.data;
//     //                 this.props.setAuthUserData(id, email, login);
//     //         });
//     // }
//     render() {
//         return (
//             <Header {...this.props} />
//         );
//     }
// }
// const mapStateToProps = (state) => ({
//     isAuth: state.auth.isAuth,
//     login: state.auth.login,
// });

// export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);