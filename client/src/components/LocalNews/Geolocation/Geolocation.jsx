import React from 'react';
import { connect } from 'react-redux';
import Map from '../Geolocation/Map/Map';
import './Geolocation.css';

class Geolocation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showButton: true,
            latitude: null,
            longitude: null,
            city: null,
            area: null,
            state: null,
            address: null
        }
        this.getLocation = this.getLocation.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this)
        this.getAddress = this.getAddress.bind(this)
    };

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
            this.setState({
                showButton: false
            })
        } else {
            alert('Geolocation is not supported by this browser!')
            this.setState({
                showButton: true
            })
        }
    };
    getCoordinates(position) {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
        // const latlng = {
        //     latitude: this.state.latitude,
        //     longitude: this.state.longitude
        // }
        // const userId = this.props.login.user.id
        // profileAPI.setLatLng(userId, latlng)
        this.getAddress()
    };
    getFirstWord(str) {
        let spaceIndex = str.indexOf(',');
        return spaceIndex === -1 ? str : str.substr(0, spaceIndex);
    };
    getAddress() {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=AIzaSyDysfnjCeC7j9QnDRmPgXt7EZCCm_PmUZU`)
            .then(response => response.json({}))
            .then(data => {
                this.setState({
                    city: this.getFirstWord(data.results[6].formatted_address),
                    area: this.getFirstWord(data.results[4].formatted_address),
                    state: this.getFirstWord(data.results[8].formatted_address),
                    address: data.results[0].formatted_address
                })
                // const locationData = {
                //     city: this.state.city,
                //     area: this.state.area,
                //     state: this.state.state,
                //     address: this.state.address,
                // }
                // const userId = this.props.login.user.id
                // profileAPI.setAddress(userId, locationData)
            })
            .catch(error => alert('An error: ' + error))
    };
    handleLocationError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default:
                alert("An unknown error occurred.")
        }
    };

    render() {
        return (
            <div className="container-block">
                <div className="geoBlock">
                    {this.state.showButton &&
                        <div className="geoIntro">
                            <h2>Здесь вы можете определить свои координаты и найти новости.</h2>
                            <button className="getLocation" onClick={this.getLocation}>Определить координаты</button>
                        </div>
                    }
                    {!this.state.showButton &&
                        <div>
                            {
                                this.state.latitude && this.state.longitude
                                    ?
                                    <div className="geoInfo">
                                        <Map
                                            lat={this.state.latitude}
                                            lng={this.state.longitude}
                                            google={this.props.google}
                                            height='400px'
                                            width='1090px'
                                            boxShadow='0 0 10px rgba(29, 17, 17, 0.603)'
                                            border='1px solid rgba(29, 17, 17, 0.603)'
                                            zoom={13} />
                                    </div>
                                    : null
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    login: state.login
})

export default connect(mapStateToProps, {})(Geolocation);