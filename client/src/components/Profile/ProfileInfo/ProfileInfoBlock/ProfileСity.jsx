import React from 'react';
import { profileAPI } from '../../../../redux/actions/actions';
import './ProfileInfoBlock.css';

class ProfileCity extends React.Component {
    state = {
        city: "",
        editMode: false
    }

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
                    <div onDoubleClick={this.activateEditMode}>{this.props.city}</div>
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