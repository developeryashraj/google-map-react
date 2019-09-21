import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Axios from "axios";

// import Marker from '../../src/components/Marker';
// import Map from '../M?ap';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      locations: [],
      mapSettings: {}
    };
  }
  componentDidMount() {
    Axios("http://localhost:5000/api/v1/locations")
      .then(response => {
        let result = response.data;
        this.setState({
          loading: true,
          locations: result.locations,
          mapSettings: result.initialMapSettings
        });
      })
      .catch(function(error) {
        // handle error
        this.setState({
          loading: true,
          error
        });
      });
  }
  // if (!props.loaded) return <div>Loading...</div>;
  render() {
    const { error, loading, locations, mapSettings } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!loading) {
      return <div>Loading</div>;
    } else {
      return (
        <Map google={this.props.google} className="map" {...mapSettings}>
          {locations &&
            locations.map(location => {
              return (
                <Marker
                  key={location.id}
                  name={location.name}
                  position={location.position}
                  // title="Schwules Museum greate place to visit."
                />
              );
            })}
        </Map>
      );
    }
  }
}
export default GoogleApiWrapper({
  apiKey: ""
})(MapContainer);
