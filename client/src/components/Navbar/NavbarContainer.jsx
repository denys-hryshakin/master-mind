import Navbar from './Navbar';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        sidebar: state.sidebar
    }
}
let mapDispatchToProps = () => {
    return {

    }
}
const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);


export default NavbarContainer;