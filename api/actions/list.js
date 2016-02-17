/**
 * Created by hanwencheng on 1/9/16.
 */
import DB from '../lib/db-interface.js';
var createId = require('../lib/model.js').createId


export default function listHause(req, params) {
  const reqPage = req.query.page;
  console.log("req page is", reqPage)
  var dbMethod = reqPage ? DB.getAll : DB.getAllInit
  var page = reqPage ? reqPage : null
  console.log('the page query object is parameters are', page)

  const getAll = function(){
    console.log('now query all')
    return new Promise((resolve, reject) => {
      dbMethod('house', {}, page, function(result){
        return resolve(result)
      }, function(err){
        return reject(err.msg)
      })
    })
  }

  const getCity = function(cityName){
    console.log('now query city', cityName)
    return new Promise((resolve, reject) => {
      dbMethod('house', {city : cityName}, page, function(result){
        return resolve(result)
      }, function(err){
        return reject(err.msg)
      })
    })
  }

  const getUser = function(userId){
    console.log('now query user', userId)
    return new Promise((resolve, reject) => {
      dbMethod('house', {owner : userId}, page, function(result){
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
