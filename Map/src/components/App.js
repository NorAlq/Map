import React, { Component } from "react";
import LocationList from "./LocationList";

class App extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      locations: require("./locations.json"), // This is to get the locations which are added in the locations.json file
      map: "",
      infowindow: "",
      prevmarker: ""
    };

    // retain object instance when used in the function
    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }

  componentDidMount() {
    // This allows Google Maps to invoke the initMap() by making the function global to the window context
    window.initMap = this.initMap;
    //This will load the Google Maps script asynchronously and passing the callback reference
    loadMapJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyABL171A0Vrswbv3WB_eXqkTcRjb71rurs&callback=initMap");
  }

  /**
   * This is initialise the map after the script for google maps is loaded
   */
  initMap() {
    var self = this;
    //getting refrence to the map element to add the locations to it
    var mapView = document.getElementById("map");
    //setting the height of the map element
    mapView.style.height = window.innerHeight + "px";
    //setting the default view of the map to be centered and with the corresponding latitude and longtitude with zoom equals to 15
    var map = new window.google.maps.Map(mapView, {center: { lat: 24.4958762, lng: 39.5936852 },zoom: 15,mapTypeControl: false
    });

    var InfoWindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(InfoWindow, "closeclick", function() {
      self.closeInfoWindow();
    });

    this.setState({
      map: map,
      infowindow: InfoWindow
    });

    window.google.maps.event.addDomListener(window, "resize", function() {
      var centerPosition = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      self.state.map.setCenter(centerPosition);
    });

    window.google.maps.event.addListener(map, "click", function() {self.closeInfoWindow();});

    var locations = [];
    this.state.locations.forEach(function(location) {
      var longname = location.name + " - " + location.type;
      var marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(location.latitude,location.longitude),animation: window.google.maps.Animation.DROP,map: map});

      marker.addListener("click", function() {
        self.openInfoWindow(marker);});
      location.longname = longname;
      location.marker = marker;
      location.display = true;
      locations.push(location);
    });
    this.setState({
      locations: locations
    });
  }

 //This is to provide information about the marker when it is clicked on
  openInfoWindow(markerInfo) {
    this.closeInfoWindow();
    this.state.infowindow.open(this.state.map, markerInfo);
    markerInfo.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      prevmarker: markerInfo
    });
    this.state.infowindow.setContent("Loading Data Please Wait...");
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -200);
    this.getMarkerInfo(markerInfo);
  }

  /**
   * This is to get the location information from foursquare
   */
  getMarkerInfo(marker) {
    var self = this;

    // The api keys for foursquare
    var clientId = "O5RSNL501PJSMZ00WV1QDS0YBM53IY20SBTLNFG5FJTI0TVU";
    var clientSecret = "SQFI4RHK3VYVSQULUQ5UL5OZRKTTENGY0K4MRSPESOZ4U5GN";

    // Build the api end point
    var url =
      "https://api.foursquare.com/v2/venues/search?client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&v=20180323&ll=" +
      marker.getPosition().lat() +
      "," +
      marker.getPosition().lng() +
      "&limit=1";
    fetch(url)
      .then(function(response) { 
        if (response.status !== 200) { //if the status is not 200 which means the response is okay, it will give the below message
          self.state.infowindow.setContent("Sorry data can't be loaded");
          return;
        }

        // Get the text in the response
        response.json().then(function(data) {
          console.log(data);

          var location_data = data.response.venues[0];
          var place = `<h3>${location_data.name}</h3>`;
          var street = `<p>${location_data.location.formattedAddress[0]}</p>`;
          var contact = "";
          if (location_data.contact.phone)
            contact = `<p><small>${location_data.contact.phone}</small></p>`;
          var checkinsCount = "<b>Number of CheckIn: </b>" + location_data.stats.checkinsCount + "<br>";
          var readMore = '<a href="https://foursquare.com/v/' + location_data.id + '" target="_blank">Read More from <b>Foursquare Website</b></a>';
          self.state.infowindow.setContent(
            place + street + contact + checkinsCount + readMore
          );
        });
      })
      .catch(function(err) {
        self.state.infowindow.setContent("Sorry data from Foursquare couldn't be loaded");
      });
  }

  /**
   * This is to close the info window previously opened
   *
   * @memberof App
   */
  closeInfoWindow() {
    if (this.state.prevmarker) {
      this.state.prevmarker.setAnimation(null);
    }
    this.setState({prevmarker: ""});
    this.state.infowindow.close();
  }

  //This is to add the locations list to the map
  render() {
    return (
      <div>
        <LocationList key="100" locations={this.state.locations} openInfoWindow={this.openInfoWindow} closeInfoWindow={this.closeInfoWindow} />
        <div id="map" /></div>
    );
  }
}

export default App;

/**
 * This function is to load the google maps
 * @param {src} url of the google maps script
 */
function loadMapJS(src) {
  var reference = window.document.getElementsByTagName("script")[0];
  var scriptVar = window.document.createElement("script");
  scriptVar.src = src;
  scriptVar.async = true;
  scriptVar.onerror = function() {
    document.write("Sorry Google Maps could't be loaded");
  };
  ref.parentNode.insertBefore(scriptVar, reference);
}
