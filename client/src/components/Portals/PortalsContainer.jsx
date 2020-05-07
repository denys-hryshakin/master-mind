import React from 'react';
import { connect } from "react-redux";
import { follow, setPortals, unfollow } from "../../redux/reducers/portals-reducer";
import Portals from "./Portals";
import * as axios from 'axios';

class PortalsContainer extends React.Component {
    componentDidMount() {
        axios.get(`http://localhost:4000/api/portals`)
            .then(response => {
                this.props.setPortals(response.data.portals);
            })
    }
    render() {
        return (
            <>
                <Portals
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    portals={this.props.portals}
                />
            </>);
    }
}
let mapStateToProps = (state) => {
    return {
        portals: state.portalsPage.portals
    }
}

export default connect(mapStateToProps, { follow, unfollow, setPortals })(PortalsContainer);