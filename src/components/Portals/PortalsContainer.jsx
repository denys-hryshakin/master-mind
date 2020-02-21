import { connect } from "react-redux";
import Portals from "./Portals";
import { follow, unfollow, setPortals } from "../../redux/portals-reducer";

let mapStateToProps = (state) => {
    return {
        portals: state.portalsPage.portals
    }
}

export default connect(mapStateToProps, { follow, unfollow, setPortals })(Portals);