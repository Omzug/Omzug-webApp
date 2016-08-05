/**
 * Created by hanwencheng on 2/16/16.
 */

const async = require('async')
import DB from '../../lib/db-interface.js';
var aws = require('../../lib/aws');
var createId = require('../../lib/model.js').createId
import {logger} from '../../lib/logger';
var config = require('../../lib/config');

export default function deleteHouse(req, params){
  // mongodb id is 24 digits hex code
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  const LackParameterError = config.errors.LackParameterError
  const WrongRequestError = config.errors.WrongRequestError

  logger.debug('get request in deleteHouse.js with params: ', params )
  return new Promise((resolve, reject) => {
    const steps = [
      validateParams,
      checkOwnerId,
      deleteImages,
      deleteLocalData,
    ]

    function validateParams(callback){
      if(params.length < 2){
        return callback(LackParameterError)
      }
      if(!checkForHexRegExp.test(params[0]) || !checkForHexRegExp.test(params[1])){
        return callback(WrongRequestError)
      }
      callback(null)
    }

    function checkOwnerId(callback){
      DB.get('house', {_id : createId(params[1])}, function(result){
        const ownerId = result.data.owner;
        if(ownerId.toString() == params[0]){
          callback(null, result.data)
        }else{
          callback(WrongRequestError)
        }
      }, function(err){
        callback(err.msg)
      })
    }

    function deleteImages(house, callback){
      var finished = 0
      if(house.images.length == 0)
        return callback(null, house)
      house.images.some(function(imageAddress){
        const address = imageAddress.split("/")
        logger.debug('file name is', address[address.length - 1])
        return aws.delete('house', house.username, address[address.length - 1], function(err, result){
          if(err) {
            callback(err)
            return true;
          }else{
            finished ++
            logger.debug(finished + ' image is successfully deleted with address ' + imageAddress )
            if(finished == house.images.length){
              callback(null, house)
            }
            return false
          }
        })
      })
    }

    function deleteLocalData(house, callback){
      DB.delete('house', {_id : house._id}, function(result){
        callback(null, result)
      }, function(err){
        callback(err.msg)
      })
    }

    async.waterfall(steps, function(err, result){
      if(err){
        logger.error("err in deleteHouse is", err)
        if(err.msg) {
          reject(err.msg)
        }else if(typeof err == "string"){
          reject(err)
        }else{
          reject('submit internal error', err.toString())
        }
      }else {
        resolve({
          status : true,
          data : result
        })
      }
    })
  });
}