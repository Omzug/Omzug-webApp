/**
 * Created by hanwencheng on 2/13/16.
 */

var AWS = require('aws-sdk');
var config = require('./config')
AWS.config.update({region : 'eu-central-1'})
var fs = require('fs')

var s3 = new AWS.S3({params: {Bucket: 'omzug.com'}});

var getParams = function(path){
  return {
    Key : path,
  }
}

var putParams = function(file, data, username) {
  return {
    ACL:"public-read",
    Key : "photos/" +username + "/" +  file.name,
    Body : data,
    Expires : config.awsExpire,
    //Expires : Date.now() + config.awsExpire * 24 * 3600 * 1000 ,
    //ContentType : file.type,
  }
}

var deleteParams = function(path){
  return {
    Key : path,
  }
}

console.log('aws endpoint is' , s3.endpoint);

const deleteObject = function(path, callback){
  s3.deleteObject(deleteParams(path), callback)
}

const upload = function(file, username, callback){
  fs.readFile(file.path, (err, data) => {
    if (err) callback(err);
    s3.putObject(putParams(file, data, username), callback);
  })
}

const get = function(path, callback){
  s3.getObject(getParams(path), callback)
}

var callback = function(err, data){
  if(err) console.log(err, err.stack);
  console.log(data);
}

module.exports.upload = upload;
module.exports.get = upload;
module.exports.delete = deleteObject;