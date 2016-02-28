/**
 * Created by hanwencheng on 2/27/16.
 */

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import GoogleMap from 'google-map-react';
import MapMarker from './MapMarker';


@connect(
  state => ({
    entity: state.entity.data,
  }),
  {})
export default class SimpleMapPage extends Component {
  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 15,
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
    var {entity} = this.props
    return (
      <GoogleMap
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onGoogleApiLoaded={({map, maps}) => {
          var geocoder = new maps.Geocoder()
          console.log('geocoder is', geocoder)
          console.log('map is', map, 'maps is ', maps)
          if(entity.location != null){
            var request = {
              address: entity.location,
              region: "de",
            }
            geocoder.geocode(request, function(result, status){
            console.log('response status is', status, result)
            if (status == maps.GeocoderStatus.OK) {
              console.log('map result is', result)
            }
          })
          }

        }}
      >
        <MapMarker lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
        <MapMarker {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
      </GoogleMap>
    );
  }
}