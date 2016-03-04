/**
 * Created by hanwencheng on 1/9/16.
 */
import DB from '../lib/db-interface.js';

export default function listHause(req, params) {
  const skip = req.query.skip;
  //console.log("req skip is", skip)
  var skipNumber = skip ? parseInt(skip) : 0
  //console.log('should skip number is ', skipNumber)

  const getAll = function(){
    //console.log('now query all')
    return new Promise((resolve, reject) => {
      DB.getAll('house', {}, skipNumber, function(result){
        return resolve(result)
      }, function(err){
        return reject(err.msg)
      })
    })
  }

  const getCity = function(cityName){
    //console.log('now query city', cityName)
    return new Promise((resolve, reject) => {
      DB.getAll('house', {city : cityName}, skipNumber, function(result){
        return resolve(result)
      }, function(err){
        return reject(err.msg)
      })
    })
  }

  // no limit for total number
  const getUser = function(userId){
    //console.log('now query user', userId)
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
