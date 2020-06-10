import React from 'react';
import { connect } from 'react-redux';
import { profileAPI } from '../../../../redux/actions/actions';
import './ProfileInfoBlock.css';

class ProfileSurname extends React.Component {
    state = {
        surname: this.props.surname,
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
        const surname = {
            surname: this.state.surname
        }
        profileAPI.updateSurname(userId, surname)
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

    componentDidUpdate(prevProps) {
        if (prevProps.surname !== this.props.surname) {
            this.setState({
                surname: this.props.surname
            })
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.editMode &&
                    <div className="infoLabel" onDoubleClick={this.activateEditMode}>{this.props.surname}</div>
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
                                id="surname"
                                type="text"
                                placeholder="Press Enter to submit"
                                value={this.state.surname} />
                        </form>
                    </div>
                }
            </div>
        );
    }
}
let mapStateToProps = state => ({})
export default connect(mapStateToProps, { profileAPI })(ProfileSurname);