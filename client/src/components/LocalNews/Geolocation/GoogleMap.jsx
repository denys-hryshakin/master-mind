import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import './../LocalNews.css'

const mapStyles = {
  width: '800px',
  height: '500px',
  border: '1px solid rgba(29, 17, 17, 0.603)',
  boxShadow: '0 0 10px rgba(29, 17, 17, 0.603)',
};

class GoogleMap extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div className="map">
        <h1>Map</h1>
        <Map
          google={this.props.google}
          zoom={16}
          style={mapStyles}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng
          }}
        >
         <Marker
          onClick={this.onMarkerClick}
          name={'This is test name'}
        />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDysfnjCeC7j9QnDRmPgXt7EZCCm_PmUZU"
})(GoogleMap);