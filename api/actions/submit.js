/**
 * Created by hanwencheng on 2/4/16.
 */
var formidable = require('formidable');
const async = require('async')
import DB from '../lib/db-interface.js';
var mongoModel = require('../lib/model.js')
var createId = mongoModel.createId
var fs = require('fs');
var aws = require('../lib/aws');
var tmpPath = require('../lib/config').tmpPath;
var awsPrefix = require('../lib/config').awsPrefix;

function upload(file, callback){
  console.log('file success upload: ', file)
  callback(null, file)
}

function get(name){
  console.log('success get the file')
}

function deleteImage(path){
  console.log('now delete image')
}

function processImageAddress(path){
  console.log('process address is', path)
  var paths = path.split("/")
  var relativePath = paths[paths.length - 2] + "/" + paths[paths.length - 1]
  console.log('we get new path is', relativePath)
  return relativePath
}

export default function submit(req, params) {
  console.log('in api submit.js we get request is', params)

    //1. compare address array and the database
    //先增加后减少的情况,做判断
    // if less, then check filenames, if exist here, then keep same, if not exist, delete it

    // 先减少后增加的情况,只能重新上传

    //对FILES NAME 做判断


  var submitHouse = req.body;
  var form = new formidable.IncomingForm();
  form.uploadDir = tmpPath;
  form.keepExtensions = true;

  return new Promise((resolve, reject) => {

    var house;
    var deleteFiles = [];
    var addFiles = [];

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
        var filesArray = [];
        if (err) {
          callback(err)
        } else {
          console.log("files are ", files)
          for(var item in fields){
            if(fields.hasOwnProperty(item) && fields[item] == "null")
              delete fields[item];
          }
          house = Object.assign({}, fields)
          console.log('copied house object is', house)

          // normalize file into array
          for(var fileName in files){
            if(files.hasOwnProperty(fileName)){
              filesArray.push(files[fileName])
            }
          }

          // normalize images, only these two situation
          if(house.images == ''){
            house.images = []
          }else {
            house.images = house.images.split(',')
          }
          callback(null, house, filesArray)
        }
      })
    }

    function compareImages(house, files, callback) {
      //if new entity, skip this
      if(params.length == 0)
        return callback(null, house, files)

      var houseId = createId(house._id)
      DB.get('house', {_id: houseId}, function (result) {
        result.data.images.forEach(function (imageAddress) {
          // if it is in our database
          if (house.images.indexOf(imageAddress) < 0) {
            deleteFiles.push(imageAddress);
          }
        })
        callback(null, house, files)
      }, function (err) {
        callback(err)
      })
    }

    function deleteImages(house, files, callback){
      var finished = 0;
      if(deleteFiles.length <= 0)
        return callback(null, house, files)

      deleteFiles.forEach(function(imageAddress){
        aws.delete(processImageAddress(imageAddress), function(err, result){
          if(err){
            callback(err)
          }else{
            finished ++;
            if(finished == deleteFiles.length){
              callback(null, house, files)
            }
          }
        })
      })
    };

    function uploadImage(house, files, callback) {
      if(files.length == 0){
        return callback(null, house, files)
      }
      var finished = 0

      files.some(function(file){
        console.log('start upload with file ', file.name)
        aws.upload(file, house.username, function (err, data) {
          if (err) {
            console.log('we get error', err)
            callback(err)
            return true
          }else{
            console.log("here we get data is", data)
            // TODO should process it into address
            const path = awsPrefix + house.username + '/' + file.name;
            console.log('the adding images path is ', path)
            house.images = house.images.concat(path)
            finished ++
            if(finished == files.length) {
              callback(null, house, files)
            }
          }
        })
      })
    }

    function deleteLocalTemp(house, files, callback){
      if(files.length == 0){
        return callback(null, house)
      }
      var deleted = 0;
      files.some(function(file){
        fs.unlink(file.path, function(err){
          if(err){
            callback(err)
            return true
          }
          console.log('successful delete file', file.name)
          deleted++
          if(deleted == files.length){
            callback(null, house)
          }
        })
      })
    }


    function updateDatabase(house, callback) {
      if(params.length == 0){
        // this case is new submit
        DB.save("house", house, function(result){
          console.log('insert new house in our database with:', result.data)
          callback(null, result.data)
        }, function(err){
          console.log('err in insert new house in database :', err)
          callback(err)
        })
      }else{
        // this case is update existed house
        DB.update('house', {_id : house._id}, house, function(result){
          console.log('update house in our database with: ', result.data)
          callback(null, result.data)
        }, function(err){
          console.log('err in update house in database : ', err)
          callback(err)
        })
      }

    }

    async.waterfall(steps, function(err, result){
      console.log("err and house is", err, result)
      if(err){
        if(err.msg) {
          reject(err.msg)
        }else if(typeof err == "string"){
          reject(err)
        }else{
          console.log("we got error object: " , err)
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