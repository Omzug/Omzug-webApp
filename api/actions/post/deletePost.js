/**
 * Created by hanwencheng on 3/5/16.
 */

/**
 * Created by hanwencheng on 2/16/16.
 */

const async = require('async')
import DB from '../../lib/db-interface.js';
var createId = require('../../lib/model.js').createId
import {logger} from '../../lib/logger';

export default function deletePost(req, params){
  // mongodb id is 24 digits hex code
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  const LackParameterError = 'request error : does not have enough parameter'
  const WrongRequestError = 'request error : parameter does not qualified'

  logger.debug('get request in deletePost.js with params: ', params )
  return new Promise((resolve, reject) => {
    const steps = [
      validateParams,
      checkOwnerId,
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
      DB.get('post', {_id : createId(params[1])}, function(result){
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

    function deleteLocalData(post, callback){
      DB.delete('post', {_id : post._id}, function(result){
        callback(null, result)
      }, function(err){
        callback(err.msg)
      })
    }

    async.waterfall(steps, function(err, result){
      if(err){
        logger.error("err in deletePost is", err)
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