/**
 * Created by hanwencheng on 2/29/16.
 */

var GoogleMapsAPI = require('googlemaps');
var config = require('./config');

console.log('key is', config.googleMapKey)
var publicConfig = {
  key: config.googleMapKey,
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};

var geocodeParams = {
  "address":    "121, Curtain Road, EC2A 3AD, London UK",
  "components": "components=country:GB",
  "bounds":     "55,-1|54,1",
  "language":   "en",
  "region":     "uk"
};

var gmAPI = new GoogleMapsAPI(publicConfig)
gmAPI.geocode(geocodeParams, function(err, result){
  console.log(result);
});

module.exports = gmAPI;