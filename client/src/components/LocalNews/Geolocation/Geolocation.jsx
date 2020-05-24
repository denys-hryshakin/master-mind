import React from 'react';
import GoogleMap from './GoogleMap';
import './../LocalNews.css'

class Geolocation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            userAddress: null
        }
        this.getLocation = this.getLocation.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this)
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        } else {
            alert('Geolocation is not supported by this browser!')
        }
    }

    getCoordinates(position) {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }

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
    }

    render() {
        return (
            <div className="geoBlock">
                <div className="geoIntro">
                    <h2>Here you can detect your coordinates and find news.</h2>
                    <button className="getLocation" onClick={this.getLocation}>Get coordinates</button>
                </div>
                {
                    this.state.latitude && this.state.longitude
                        ?
                        <div className="geoInfo">
                            <h1>User Coordinates</h1>
                            <div>Latitude: {this.state.latitude}</div>
                            <div>Longtitude: {this.state.longitude}</div>
                            <div>User Address: {this.state.userAddress}</div>
                            <GoogleMap lat={this.state.latitude} lng={this.state.longitude} />
                        </div>
                        : null
                }
            </div>
        )
    }
}

export default Geolocation;