/**
 * Created by hanwencheng on 2/13/16.
 */

var AWS = require('aws-sdk');
var config = require('./config')
AWS.config.update({region : 'eu-central-1'})

var s3 = new AWS.S3({params: {Bucket: 'omuzug'}});

var getParams = function(path){
  return {
    Key : path,
  }
}

var putParams = function(file, username) {
  return {
    ACL:"public-read",
    Key : "photo/" +username + "/" +  file.name,
    Body : file,
    Expire : config.awsExpire,
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
  s3.putObject(putParams(file, username), callback);
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