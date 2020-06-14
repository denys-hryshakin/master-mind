import React from 'react';
import './ProfileInfoBlock.css';

class ProfileCity extends React.Component {
    state = {
        city: this.props.city,
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
        const city = {city: this.state.city}
        this.props.updateCity(userId, city)
        this.setState({
            editMode: false
        })
    }
    onChange = (e) => {
        this.setState({ city: e.currentTarget.value });
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.city !== this.props.city) {
            this.setState({
                city: this.props.city
            })
        }
    }

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
                                autoFocus={true}
                                required={true}
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