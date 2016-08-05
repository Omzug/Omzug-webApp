import DB from '../../lib/db-interface.js';
import {logger} from '../../lib/logger'
var config = require('../../lib/config');
import urlencode from 'urlencode';
const async = require('async')

export default function listFavorite(req, params) {
  const skip = req.query.skip;
  logger.trace("req skip is", skip)
  var skipNumber = skip ? parseInt(skip) : 0

  var idList = req.body.starList
  logger.trace("request idList is" , idList)
  const select = { owner: 1, _id: 1, title :1 , price : 1, city :1 , username : 1,images :1 ,updatedAt: 1,};

  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  const LackParameterError = config.errors.LackParameterError
  const WrongRequestError = config.errors.WrongRequestError

  return new Promise((resolve, reject) => {
    const steps = [
      validateParams,
      getResult,
      compareResult,
      updateDatabase,
    ]

    function validateParams(callback){
      if(params.length < 1){
        return callback(LackParameterError)
      }
      if(!checkForHexRegExp.test(params[0])){
        return callback(WrongRequestError)
      }
      if(idList == undefined ){
        return callback(WrongRequestError)
      }
      callback(null)
    }

    function getResult(callback){
      DB.getAll('house', {_id :  { $in : idList } }, select, skipNumber, function(result){
        return callback(null, result)
      }, function(err){
        return callback(err.msg)
      })
    }

    function compareResult(result, callback){
      logger.trace('compare length', result.data.length,  idList.length)
      if(result.data.length == idList.length)
        return callback(null, result)

      result.newList = idList.filter(function (id) {
        var isContained = result.data.some(function (dataObject) {
          logger.trace("data object is", dataObject, "and id is", id)
          return dataObject._id == id;
        })
        logger.trace("is Contained is", isContained)
        return isContained
      })
      callback(null, result)
    }

    function updateDatabase(result, callback){
      if(result.data.length == idList.length)
        return callback(null, result)

      var userId = params[0]
      DB.update('user', {_id : userId}, {$set : { starList : result.newList}}, function(queryResult){
        req.session.user.starList = queryResult.data._doc.starList;
        req.session.user.updatedAt = queryResult.data._doc.updatedAt;
        logger.trace('session information now changed: ', req.session.user)
        callback(null, result)
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
        resolve(result)
      }
    })
  })
}