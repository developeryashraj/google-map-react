import React, { Component } from "react";

export class Locations extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      address: "",
      id: ""
    };
    this.state = this.initialState;
  }

  resetData = () => {
    this.setState(this.initialState);
  };
  addLocation = () => {
    if (!!this.state.address) {
      if (this.state.id !== "") {
        this.props.addLocation(this.state.address, this.state.id);
      } else {
        this.props.addLocation(this.state.address);
      }
      this.resetData();
    } else {
      alert("enter valid address");
    }
  };
  handleChange = e => {
    this.setState({
      address: e.target.value
    });
  };
  handleDelete = e => {
    this.props.deleteLocation(e.target.id);
  };
  handleEdit = e => {
    this.setState({
      address: e.target.name,
      id: e.target.id
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
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.address}
        />
        <button onClick={this.addLocation}>Add Location</button>
        <ul>
          {locations &&
            locations.map(location => {
              return (
                <li key={location.id}>
                  {location.name}{" "}
                  <button
                    onClick={this.handleEdit}
                    id={location.id}
                    name={location.name}
                  >
                    Edit
                  </button>{" "}
                  |
                  <button onClick={this.handleDelete} id={location.id}>
                    Delete
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
