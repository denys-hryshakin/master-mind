import React from 'react';
import { connect } from 'react-redux';
import { profileAPI } from '../../../../redux/actions/actions'
import './ProfileInfoBlock.css'

class ProfileCountry extends React.Component {
    state = {
        country: "",
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
    onSubmit = (e) => {
        e.preventDefault()
        let userId = this.props.userId
        const country = {
            country: this.state.country
        }
        profileAPI.updateCountry(userId, country)
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
                    <div className="infoLabel" onDoubleClick={this.activateEditMode}>{this.props.country}</div>
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
                                id="country"
                                placeholder="Press Enter to submit"
                                type="text"
                                value={this.state.country} />
                        </form>
                    </div>
                }
            </div>
        );
    }
}

let mapStateToProps = state => ({

})

export default connect(mapStateToProps, { profileAPI })(ProfileCountry);