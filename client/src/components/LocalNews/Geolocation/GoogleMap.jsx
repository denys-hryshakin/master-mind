import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow  } from 'google-maps-react';
import './../LocalNews.css'

const mapStyles = {
  width: '800px',
  height: '500px',
  border: '1px solid rgba(29, 17, 17, 0.603)',
  boxShadow: '0 0 10px rgba(29, 17, 17, 0.603)',
};

class GoogleMap extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <div className="map">
        <h1>Карта</h1>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng
          }}
          onClick={this.onMapClicked}
        >
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "XXX",
  language: 'ua'
})(GoogleMap);
