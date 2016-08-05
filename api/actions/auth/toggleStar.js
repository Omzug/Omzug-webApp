/**
 * Created by hanwencheng on 3/14/16.
 */

const async = require('async')
import DB from '../../lib/db-interface.js';
var createId = require('../../lib/model.js').createId
import {logger} from '../../lib/logger';
var config = require('../../lib/config');
import {filterPassword} from '../../utils/url'

export default function toggleStar(req, params){
  // mongodb id is 24 digits hex code
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  const LackParameterError = config.errors.LackParameterError
  const WrongRequestError = config.errors.WrongRequestError
  var newList = req.body;

  logger.debug('get request in toggleStar.js with params: ', params ,"new list is ", newList)
  return new Promise((resolve, reject) => {
    const steps = [
      validateParams,
      updateList,
    ]

    function validateParams(callback){
      if(params.length < 2){
        return callback(LackParameterError)
      }
      if(!checkForHexRegExp.test(params[0]) || !checkForHexRegExp.test(params[1])){
        return callback(WrongRequestError)
      }
      if(newList == undefined ){
        return callback(WrongRequestError)
      }
      callback(null)
    }

    function updateList(callback){
      var userId = params[0]
      var houseId = params[1]
      DB.update('user', {_id : userId}, {$set : { starList : newList}}, function(result){
        req.session.user.starList = result.data._doc.starList;
        req.session.user.updatedAt = result.data._doc.updatedAt;
        logger.debug('session information now changed: ', req.session.user)
        callback(null, result.data._doc.starList)
      }, function(err){
        callback(err)
      })
    }

    async.waterfall(steps, function(err, result){
      if(err){
        logger.error("err in toggleStar is", err)
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
  })
}