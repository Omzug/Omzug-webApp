/**
 * Created by hanwencheng on 3/5/16.
 */

import DB from '../../lib/db-interface.js';
import {logger} from '../../lib/logger'
import urlencode from 'urlencode';

export default function listPosts(req, params) {
  logger.debug('get list post request params is : ', params)
  const skip = req.query.skip;
  var skipNumber = skip ? parseInt(skip) : 0

  const select = { owner: 1, _id: 1, description :1 , city :1 , username : 1,images :1 };

  const getAll = function(){
    logger.debug('now query all')
    return new Promise((resolve, reject) => {
      DB.getAll('post', {}, select, skipNumber, function(result){
        return resolve(result)
      }, function(err){
        return reject(err.msg)
      })
    })
  }

  const getCity = function(cityName){
    logger.debug('now query city', cityName)
    return new Promise((resolve, reject) => {
      DB.getAll('post', {city : cityName}, select, skipNumber, function(result){
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
      DB.getAllNoLimit('post', {owner : userId}, function(result){
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
      return params[1] ? getCity(urlencode.decode(params[1])) : getAll()
    case "user" :
      return params[1] ? getUser(urlencode.decode(params[1])) : getAll()
    default :
      return getAll()
  }
}