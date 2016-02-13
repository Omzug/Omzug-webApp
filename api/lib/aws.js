/**
 * Created by hanwencheng on 2/13/16.
 */

var AWS = require('aws-sdk');

AWS.config.update({region : 'eu-central-1'})

var s3 = new AWS.S3();

var getParams = function(path){
  return {
    Bucket : "omzug",
    Key : path,
  }
}

var putParams = function(file) {
  return {
    Bucket : "omzug",
    ACL:"public-read",
    Key : "photo/" + name,
    Body : file,
    //ContentType : file.type,
  }
}

console.log('aws endpoint is' , s3.endpoint);

const upload = function(file, callback){
  s3.putObject(putParams(file), callback);
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