import React from 'react';
import { connect } from 'react-redux';
import { profileAPI } from '../../../../redux/actions/actions'
import './ProfileInfoBlock.css'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom'

class ProfileName extends React.Component {
    state = {
        name: "",
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
    onSubmit = (e) => {
        e.preventDefault()
        let userId = this.props.userId
        const name = {
            name: this.state.name
        }
        profileAPI.updateName(userId, name)
        this.setState({
            editMode: false
        })
    }
    deactivateEditMode = () => {
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
                        <div onDoubleClick={this.activateEditMode}>{this.props.name}</div>
                    </this.LightTooltip>
                }
                {
                    this.state.editMode &&
                    <div>
                        <form className="profileInfoForm" onSubmit={this.onSubmit}>
                            <input
                                autoFocus
                                required
                                onChange={this.onChange}
                                onBlur={this.deactivateEditMode}
                                id="name"
                                placeholder="Press Enter to submit"
                                type="text"
                                value={this.state.name} />
                        </form>
                    </div>
                }
            </div>
        );
    }
}

let mapStateToProps = state => ({
    login: state.login
})

export default connect(mapStateToProps, { profileAPI })(ProfileName);