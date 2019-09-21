import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Axios from "axios";
import { Locations } from "./Locations";

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
    Axios.get("http://localhost:5000/api/v1/locations")
      .then(response => {
        let result = response.data;
        this.setState({
          loading: true,
          locations: result.locations,
          mapSettings: result.initialMapSettings
        });
      })
      .catch(error => {
        // handle error
        this.setState({
          loading: true,
          error
        });
      });
  }
  addLocation = (address = "", id = "") => {
    if (!!address) {
      Axios.post("http://localhost:5000/api/v1/add", {
        title: address,
        id: id
      })
        .then(response => {
          let result = response.data;
          if (result.success === "true") {
            this.setState({
              loading: true,
              locations: result.locations
            });
          }
        })
        .catch(error => {
          // handle error
          this.setState({
            loading: true,
            error
          });
        });
    } else {
      alert("invalid address");
    }
  };
  deleteLocation = locationID => {
    if (!!locationID) {
      Axios.delete("http://localhost:5000/api/v1/delete/" + locationID)
        .then(response => {
          let result = response.data;
          if (result.success === "true") {
            this.setState({
              loading: true,
              locations: result.locations
            });
          }
        })
        .catch(error => {
          // handle error
          this.setState({
            loading: true,
            error
          });
        });
    } else {
      alert("invalid address");
    }
  };
  // if (!props.loaded) return <div>Loading...</div>;
  render() {
    const { error, loading, locations, mapSettings } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!loading) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
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
          <Locations
            locations={locations}
            addLocation={this.addLocation}
            deleteLocation={this.deleteLocation}
          />
        </div>
      );
    }
  }
}
export default GoogleApiWrapper({
  apiKey: ""
})(MapContainer);
