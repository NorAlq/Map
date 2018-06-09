import React from "react";

class LocationItem extends React.Component {
  //This render is used to add the list of the locations items
  render() {
    return (
      <li role="button" className="place" tabIndex="0" onKeyPress={this.props.openInfoWindow.bind(
          this,this.props.data.marker)}
        onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}>
        {this.props.data.longname}</li>
    );
  }
}

export default LocationItem;
