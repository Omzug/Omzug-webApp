/**
 * Created by hanwencheng on 2/29/16.
 */

var GoogleMapsAPI = require('googlemaps');
var config = require('./config');
import {logger} from './logger';

logger.info('key is', config.googleMapKey)
var publicConfig = {
  key: config.googleMapKey,
  //stagger_time:       1000,
  // for elevationPath
  //encode_polylines:   false,
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

function geocode(address, callback){
  gmAPI.geocode({
    "address": address + ' Germany',
    //"components": "components=country:GB",
    //"bounds":     "55,-1|54,1",
    //"language":   "en",
    "region":     "de"
  }, callback);
}

//geocode("121, Curtain Road, EC2A 3AD, London UK", function(err, results){
//  logger.debug("map err is:" , err, "and result is ", results.results[0].geometry.location)
//})
export {geocode}