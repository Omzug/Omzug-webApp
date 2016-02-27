/**
 * Created by hanwencheng on 2/27/16.
 */

import React, {PropTypes, Component} from 'react';

import GoogleMap from 'google-map-react';
import MapMarker from './MapMarker';

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
    return (
      <GoogleMap
        bootstrapURLKeys={{
          key: apiKey,
          language: 'de',
        }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}>
        <MapMarker lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
        <MapMarker {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
      </GoogleMap>
    );
  }
}