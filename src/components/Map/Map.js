/**
 * Created by hanwencheng on 2/27/16.
 */

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import GoogleMap from 'google-map-react';
import MapMarker from './MapMarker';

export default class SimpleMapPage extends Component {
  static propTypes = {
    geometry : PropTypes.array.isRequired
  }

  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 12,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

  constructor(props) {
    super(props);
  }

  render() {
    var apiKey = null;
    if(process.env.NODE_ENV === "production"){
      apiKey = "AIzaSyC4gQqD5iZsmbmknKIYR42sTfjcd8pl4aw";
    }
    console.log('geometry is : ',  this.props.geometry)
    //if(entity.location != null){
    //  var request = {
    //    address: entity.location + " " + entity.city,
    //    region: "de",
    //  }
    //  geocoder.geocode(request, function(results, status){
    //  console.log('response status is', status, results)
    //  if (status == maps.GeocoderStatus.OK) {
    //    console.log('map result is', results)
    //    var location = results[0].geometry.location
    //    console.log('locationis ' ,results[0].geometry)
    //    console.log('lat is', location.lat)
    //    console.log('lat function result is', location.lat());
    //  }
    //})
    var geometry = {lat : this.props.geometry[0], lng : this.props.geometry[1]}
    return (
      <GoogleMap
        defaultCenter={geometry}
        defaultZoom={this.props.zoom}
        onGoogleApiLoaded={({map, maps}) => {
          var geocoder = new maps.Geocoder()
          console.log('geocoder is', geocoder)
          console.log('map is', map, 'maps is ', maps)
          }
        }
      >
        <MapMarker lat={geometry.lat} lng={geometry.lng} text={'!'} />
      </GoogleMap>
    );
  }
}