import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { profileAPI } from '../../redux/actions/actions'

class NavbarContainer extends React.Component {
    render() {
        return(  
            <div>
                <Navbar
                    login={this.props.login}
                    profile={this.props.profile} />
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        sidebar: state.sidebar,
        login: state.login,
    }
}

export default connect(mapStateToProps, { profileAPI })(NavbarContainer);
