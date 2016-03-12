/**
 * Created by hanwencheng on 1/9/16.
 */
import DB from '../../lib/db-interface.js';
import {logger} from '../../lib/logger'

export default function listHause(req, params) {
  const skip = req.query.skip;
  logger.trace("req skip is", skip)
  var skipNumber = skip ? parseInt(skip) : 0
  logger.trace('should skip number is ', skipNumber)

  const select = { owner: 1, _id: 1, title :1 , price : 1, city :1 , username : 1,images :1 };

  const getAll = function(){
    logger.trace('now query all')
    return new Promise((resolve, reject) => {
      DB.getAll('house', {}, select, skipNumber, function(result){
        return resolve(result)
      }, function(err){
        return reject(err.msg)
      })
    })
  }

  const getCity = function(cityName){
    logger.trace('now query city', cityName)
    return new Promise((resolve, reject) => {
      DB.getAll('house', {city : cityName}, select, skipNumber, function(result){
        return resolve(result)
      }, function(err){
        return reject(err.msg)
      })
    })
  }

  // no limit for total number
  const getUser = function(userId){
    logger.trace('now query user', userId)
    return new Promise((resolve, reject) => {
      DB.getAllNoLimit('house', {owner : userId}, function(result){
        return resolve(result)
      }, function(err){
        return reject(err.msg)
      })
    })
  }

  if(params.length <= 0) {
    return getAll();
  }

  switch(params[0]) {
    case "city" :
      return params[1] ? getCity(params[1]) : getAll()
    case "user" :
      return params[1] ? getUser(params[1]) : getAll()
    default :
      return getAll()
  }
}
