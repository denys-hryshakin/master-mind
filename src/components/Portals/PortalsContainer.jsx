import { connect } from "react-redux";
import Portals from "./Portals";
import { followAC, unfollowAC, setPortalsAC } from "../../redux/portals-reducer";

let mapStateToProps = (state) => {
    return {
        portals: state.portalsPage.portals
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (portalId) => {
            dispatch(followAC(portalId));
        },
        unfollow: (portalId) => {
            dispatch(unfollowAC(portalId));
        },
        setPortals: (portals) => {
            dispatch(setPortalsAC(portals));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portals);