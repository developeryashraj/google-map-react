import React, { Component } from "react";

export class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ""
    };
  }
  addLocation = () => {
    if (!!this.state.address) {
      this.props.addLocation(this.state.address);
    } else {
      alert("enter valid address");
    }
  };
  handleChange = e => {
    this.setState({
      address: e.target.value
    });
  };
  render() {
    const { locations } = this.props;
    var divStyle = {
      position: "relative",
      marginLeft: "50px",
      float: "right"
    };

    return (
      <div style={divStyle}>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.addLocation}>Add Location</button>
        <ul>
          {locations &&
            locations.map(location => {
              return <li key={location.id}>{location.name}</li>;
            })}
        </ul>
      </div>
    );
  }
}
