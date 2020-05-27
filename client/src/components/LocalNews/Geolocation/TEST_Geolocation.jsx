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
        this.getAddress = this.getAddress.bind(this)
    };
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        } else {
            alert('Geolocation is not supported by this browser!')
        }
    };
    getCoordinates(position) {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
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
                console.log(data)
                this.setState({
                    userAddress: this.getFirstWord(data.results[6].formatted_address)
                })
            })
            .catch (error => alert('An error: ' + error))
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
            <div className="geoBlock">
                <div className="geoIntro">
                    <h2>Здесь вы можете определить свои координаты и найти новости.</h2>
                    <button className="getLocation" onClick={this.getLocation}>Определить координаты</button>
                </div>
                {
                    this.state.latitude && this.state.longitude
                        ?
                        <div className="geoInfo">
                            <h1>Координаты</h1>
                            <div>Широта: {this.state.latitude}</div>
                            <div>Долгота: {this.state.longitude}</div>
                            <div>Город: {this.state.userAddress}</div>
                            <GoogleMap lat={this.state.latitude} lng={this.state.longitude} />
                        </div>
                        : null
                }
            </div>
        )
    }
}

export default Geolocation;