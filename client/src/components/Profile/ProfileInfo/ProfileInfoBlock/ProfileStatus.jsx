import React from 'react';
import './ProfileInfoBlock.css';

class ProfileStatus extends React.Component {
    state = {
        status: this.props.status,
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
        e.preventDefault();
        let userId = this.props.userId;
        const status = { status: this.state.status };
        this.props.updateStatus(userId, status)
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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.editMode &&
                    <div onDoubleClick={this.activateEditMode}>{this.props.status}</div>
                }
                {
                    this.state.editMode &&
                    <div>
                        <form className="profileInfoForm" onSubmit={this.onSubmit}>
                            <input
                                autoFocus={true}
                                required={true}
                                onChange={this.onChange}
                                onBlur={this.deactivateEditMode}
                                id="status"
                                placeholder="Press Enter to submit"
                                type="text"
                                value={this.state.status} />
                        </form>
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;