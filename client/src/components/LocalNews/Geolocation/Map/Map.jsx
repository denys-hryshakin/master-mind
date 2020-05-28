import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { profileAPI } from '../../../../redux/actions/actions';
import { connect } from 'react-redux'

Geocode.setApiKey("AIzaSyB3kPBRNJoMpVxk1LO3OrmgQCvWJX-7Q94");
Geocode.enableDebug();
Geocode.setLanguage('en')

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            mapPosition: {
                lat: this.props.lat,
                lng: this.props.lng
            },
            markerPosition: {
                lat: this.props.lat,
                lng: this.props.lng
            }
        }
    }
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
    componentDidMount() {
        Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                })
                const locationData = {
                    city: this.state.city,
                    area: this.state.area,
                    state: this.state.state,
                    address: this.state.address,
                    lat: this.state.markerPosition.lat,
                    lng: this.state.markerPosition.lng
                };
                const userId = this.props.login.user.id;
                console.log('Location:', city + ',', area + ',', state + ',', address)
                profileAPI.setAddress(userId, locationData)
            },
            error => {
                console.error(error);
            }
        );
    };
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.markerPosition.lat !== this.props.lat ||
            this.state.address !== nextState.address ||
            this.state.city !== nextState.city ||
            this.state.area !== nextState.area ||
            this.state.state !== nextState.state
        ) {
            return true
        } else if (this.props.lat === nextProps.lat) {
            return false
        }
    }
	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'locality' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };
	/**
	 * And function for city,state and address input
	 * @param event
	 */
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
    onInfoWindowClose = (event) => {

    };

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
                const locationData = {
                    city: this.state.city,
                    area: this.state.area,
                    state: this.state.state,
                    address: this.state.address,
                    lat: this.state.markerPosition.lat,
                    lng: this.state.markerPosition.lng
                };
                const userId = this.props.login.user.id;
                console.log('Location:', city + ',', area + ',', state + ',', address)
                profileAPI.setAddress(userId, locationData)
            },
            error => {
                console.error(error);
            }
        );
    };

	/**
	 * When the user types an address in the search box
	 * @param place
	 */
    onPlaceSelected = (place) => {
        console.log('Selected Place', place);
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
        // Set these values in the state.
        this.setState({
            address: (address) ? address : '',
            area: (area) ? area : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    };


    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap google={this.props.google}
                        defaultZoom={this.props.zoom}
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >
                        {/* InfoWindow on top of marker */}
                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
                        >
                            <div>
                                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                            </div>
                        </InfoWindow>
                        {/*Marker*/}
                        <Marker google={this.props.google}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                        />
                        <Marker />
                        {/* For Auto complete Search Box */}
                        <Autocomplete
                            className="autocomplete"
                            onPlaceSelected={this.onPlaceSelected}
                            types={['(regions)']}
                        />
                    </GoogleMap>
                )
            )
        );
        let map;
        if (this.props.lat !== undefined) {
            map = <div className="map">
                <div>
                    <h1>Координаты</h1>
                    <div className="form-group">
                        <div>
                            <div>
                                <label htmlFor="">Город</label>
                                <input type="text" readOnly="readOnly" value={this.state.city} />
                            </div>

                            <div>
                                <label htmlFor="">Область</label>
                                <input type="text" readOnly="readOnly" value={this.state.state} />
                            </div>

                            <div>
                                <label>Широта</label>
                                <input type="text" readOnly="readOnly" value={this.state.mapPosition.lat} />
                            </div>

                        </div>
                        <div>
                            <div>
                                <label htmlFor="">Район</label>
                                <input type="text" readOnly="readOnly" value={this.state.area} />
                            </div>
                            <div>
                                <label htmlFor="">Адрес</label>
                                <input type="text" readOnly="readOnly" value={this.state.address} />
                            </div>
                            <div>
                                <label>Долгота</label>
                                <input type="text" readOnly="readOnly" value={this.state.mapPosition.lng} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Карта</h1>
                    <AsyncMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyB3kPBRNJoMpVxk1LO3OrmgQCvWJX-7Q94&libraries=places`}
                        loadingElement={
                            <div style={{ height: `100%` }} />
                        }
                        containerElement={
                            <div style={{ marginTop: '15px', marginBottom: '230px', height: this.props.height, width: this.props.width, border: this.props.border, boxShadow: this.props.boxShadow }} />
                        }
                        mapElement={
                            <div style={{ height: `100%` }} />
                        }
                    />
                </div>
            </div>
        } else {
            map = <div style={{ height: this.props.height, width: this.props.width, }} />
        }
        return (map)
    }
}


let mapStateToProps = (state) => ({
    login: state.login
})

export default connect(mapStateToProps, {})(Map);