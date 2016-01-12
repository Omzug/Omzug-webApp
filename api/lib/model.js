/**
 * Created by hanwencheng on 1/11/16.
 */

var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var config = require('./config.js');
var Schema = mongoose.Schema;

const houseCollectionName = config.houseCollectionName;
const userCollectionName = config.userCollectionName;

var HouseSchema = require('./schemas/HouseSchema.js')(Schema, houseCollectionName);
var UserSchema = require('./schemas/UserSchema.js')(Schema, userCollectionName);

//Init database Models
var initMongoDb = function(){
  var link = "mongodb://" + config.host + '/' + config.databaseName;
  mongoose.connect( link , { server : { poolSize : 10}});
  // var link = "mongodb://" + options.host + "/" + options.database;
  // mongoose.connect( link , {
  //     server : { poolSize : 100},
  //     user: options.user,
  //     pass: options.password
  // }); // TODO change the authentication
  return mongoose.connection;
};

module.exports.initMongoDb = initMongoDb;
//module.exports.House = mongoose.model(houseCollectionName, HouseSchema);
module.exports.User = mongoose.model(userCollectionName, UserSchema)