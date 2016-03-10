/**
 * Created by hanwencheng on 2/4/16.
 */
var formidable = require('formidable');
const async = require('async')
import DB from '../../lib/db-interface.js';
var mongoModel = require('../../lib/model.js')
var createId = mongoModel.createId
var fs = require('fs');
var aws = require('../../lib/aws');
var tmpPath = require('../../lib/config').tmpPath;
var awsPostPrefix = require('../../lib/config').awsPostPrefix;
import {logger} from '../../lib/logger';

function processImageAddress(path){
  var paths = path.split("/")
  var relativePath = paths[paths.length - 1]
  return relativePath
}

export default function submit(req, params) {
  logger.debug('in api submitPost.js we get request is', params)

  var form = new formidable.IncomingForm();
  form.uploadDir = tmpPath;
  form.keepExtensions = true;

  form.on('fileBegin', function(field, file) {
    logger.debug('file name is', file.name)
  })

  var filesArray = []
  form.on('file', function(name, file) {
    var nameArray = file.path.split('/');
    var replaceName = nameArray[nameArray.length - 1];
    // upload_xxx.jpg -->omzug_xxx.jpg
    replaceName = 'omzug-' + replaceName.slice(7)

    file.name = replaceName
    filesArray.push(file);
  })

  return new Promise((resolve, reject) => {

    var post;
    var deleteFiles = [];

    var steps = [
      parseRequest,
      compareImages,
      deleteImages,
      uploadImage,
      deleteLocalTemp,
      updateDatabase,
    ]

    function parseRequest(callback) {
      form.parse(req, function (err, fields, files) {
        if (err) {
          callback(err)
        } else {
          logger.debug("received files are ", filesArray.length + " element array")
          for(var item in fields){
            if(fields.hasOwnProperty(item) && fields[item] == "null")
              delete fields[item];
          }
          post = Object.assign({}, fields)
          logger.trace('copied post object is', post)

          // normalize images, only these two situation
          if(post.images == ''){
            post.images = []
          }else {
            post.images = post.images.split(',')
          }
          callback(null, post, filesArray)
        }
      })
    }

    function compareImages(post, files, callback) {
      //if new entity, skip this
      if(params.length == 0)
        return callback(null, post, files)

      var postId = createId(post._id)
      DB.get('post', {_id: postId}, function (result) {
        result.data.images.forEach(function (imageAddress) {
          // if it is in our database
          if (post.images.indexOf(imageAddress) < 0) {
            deleteFiles.push(imageAddress);
          }
        })
        callback(null, post, files)
      }, function (err) {
        callback(err)
      })
    }

    function deleteImages(post, files, callback){
      var finished = 0;
      if(deleteFiles.length <= 0)
        return callback(null, post, files)


      deleteFiles.forEach(function(imageAddress){
        aws.delete('post', post.username , processImageAddress(imageAddress), function(err, result){
          logger.trace('finished is ', finished, 'err is', err, 'result is ', result)
          if(err){
            callback(err)
          }else{
            finished ++;
            if(finished == deleteFiles.length){
              callback(null, post, files)
            }
          }
        })
      })
    };

    function compressImages(){

    }

    function uploadImage(post, files, callback) {
      if(files.length == 0){
        return callback(null, post, files)
      }
      var finished = 0

      files.some(function(file){
        logger.debug('start upload with file ', file.name)
        aws.upload('post', file, post.username, function (err, data) {
          if (err) {
            callback(err)
            return true
          }else{
            logger.trace("here we get data is", data)
            // TODO should process it into address
            const path = awsPostPrefix + post.username + '/' + file.name;
            logger.trace('the adding images path is ', path)
            post.images = post.images.concat(path)
            finished ++
            if(finished == files.length) {
              callback(null, post, files)
            }
          }
        })
      })
    }

    function deleteLocalTemp(post, files, callback){
      if(files.length == 0){
        return callback(null, post)
      }
      var deleted = 0;
      files.some(function(file){
        fs.unlink(file.path, function(err){
          if(err){
            callback(err)
            return true
          }
          logger.debug('successful delete file', file.name)
          deleted++
          if(deleted == files.length){
            callback(null, post)
          }
        })
      })
    }


    function updateDatabase(post, callback) {
      if(params.length == 0){
        // this case is new submit
        DB.save("post", post, function(result){
          logger.trace('insert new post in our database')
          callback(null, result.data)
        }, function(err){
          callback(err)
        })
      }else{
        // this case is update existed post
        DB.update('post', {_id : post._id}, post, function(result){
          logger.trace('update post in our database: ')
          callback(null, result.data)
        }, function(err){
          callback(err)
        })
      }

    }

    async.waterfall(steps, function(err, result){
      if(err){
        logger.error("we got error in submit is " , err)
        if(err.msg) {
          reject(err.msg)
        }else if(typeof err == "string"){
          reject(err)
        }else{
          reject('submit internal error')
        }
      }else {
        resolve({
          status : true,
          data : result
        })
      }
    })
  })

}