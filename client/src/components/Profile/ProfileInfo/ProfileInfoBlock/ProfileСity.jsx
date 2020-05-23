import React from 'react';
import { profileAPI } from '../../../../redux/actions/actions'
import './ProfileInfoBlock.css'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom'

class ProfileCity extends React.Component {
    state = {
        city: "",
        editMode: false
    }
    LightTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: 'white',
            color: 'black',
            boxShadow: theme.shadows[1],
            fontSize: 13,
            padding: 7,
        },
    }))(Tooltip);

    activateEditMode = () => {
        if (this.props.login.user.id !== this.props.userId) {
            this.setState({
                editMode: false
            })
        } else {
            this.setState({
                editMode: true
            })
        }
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        let userId = this.props.userId
        const city = {
            city: this.state.city
        }
        profileAPI.updateCity(userId, city)
        this.setState({
            editMode: false
        })
    }
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        return (
            <div>
                {
                    !this.state.editMode &&
                    <this.LightTooltip
                        title="Double click for update"
                        TransitionComponent={Zoom}
                        TransitionProps={{ timeout: 300 }}
                    >
                        <div onDoubleClick={this.activateEditMode}>{this.props.city}</div>
                    </this.LightTooltip>
                }
                {
                    this.state.editMode &&
                    <div>
                        <form className="profileInfoForm" onSubmit={this.onSubmit}>
                            <input
                                autoFocus
                                onChange={this.onChange}
                                onBlur={this.deactivateEditMode}
                                id="city"
                                placeholder="Press Enter to submit"
                                type="text"
                                value={this.state.city} />
                        </form>
                    </div>
                }
            </div>
        );
    }
}
export default ProfileCity;