import React from 'react';
import './ProfileInfoBlock.css';

class ProfileName extends React.Component {
    state = {
        name: this.props.name,
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
        const name = {
            name: this.state.name
        }
        this.props.updateName(userId, name)
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
        this.setState({ name: e.currentTarget.value });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.name !== this.props.name) {
            this.setState({
                name: this.props.name
            })
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.editMode &&
                    <div onDoubleClick={this.activateEditMode}>{this.props.name}</div>
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

export default ProfileName;