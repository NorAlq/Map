import React, { Component } from "react";
import LocationItem from "./LocationItem";

class LocationList extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      locations: "",
      query: "",
    };

    this.filterLocations = this.filterLocations.bind(this);
  }

  //This is to filter locations based on user entry

  filterLocations(event) {
    this.props.closeInfoWindow();
    const { value } = event.target;
    var locations = [];
    this.props.alllocations.forEach(function(location) {
      if (location.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        location.marker.setVisible(true);
        locations.push(location);
      } else {
        location.marker.setVisible(false);
      }
    });

    this.setState({
      locations: locations,
      query: value
    });
  }

  componentWillMount() {
    this.setState({
      locations: this.props.alllocations
    });
  }

  //This render is used to add the search box and the list
  render() {
    var locationlist = this.state.locations.map(function(locationItem, index) {
      return (
        <LocationItem key={index} openInfoWindow={this.props.openInfoWindow.bind(this)}
          data={locationItem}
        />
      );
    }, this);

    return (
      <div className="search-area">
        <input type="text" placeholder="Type Location" role="search" ria-labelledby="filter" id="search-field" className="search-input" 
          value={this.state.query} onChange={this.filterLocations} />
        <ul className="location-list">
          {locationlist}
        </ul>
      </div>
    );
  }
}

export default LocationList;
