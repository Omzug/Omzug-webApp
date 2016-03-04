/**
 * Created by hanwencheng on 2/13/16.
 */

var AWS = require('aws-sdk');
var config = require('./config')
AWS.config.update({region : 'eu-central-1'})
var fs = require('fs')
import {logger} from './logger';

var s3 = new AWS.S3({params: {Bucket: config.awsBucket}});

var getParams = function(path){
  return {
    Key : config.awsFolder + "/" + path,
  }
}

var putParams = function(file, data, username) {
  return {
    ACL:"public-read",
    Key : config.awsFolder + "/" +username + "/" +  file.name,
    Body : data,
    Expires : config.awsExpire,
    //Expires : Date.now() + config.awsExpire * 24 * 3600 * 1000 ,
    //ContentType : file.type,
  }
}

var deleteParams = function(username, filename){
  return {
    Key : config.awsFolder + "/" +username + "/" +  filename,
  }
}

logger.info('aws endpoint is' , s3.endpoint);

const deleteObject = function(username, filename, callback){
  logger.debug('delete filename are ', filename)
  s3.deleteObject(deleteParams(username, filename), callback)
}

const upload = function(file, username, callback){
  fs.readFile(file.path, (err, data) => {
    if (err) callback(err);
    s3.putObject(putParams(file, data, username), callback);
  })
}

module.exports.upload = upload;
module.exports.get = upload;
module.exports.delete = deleteObject;