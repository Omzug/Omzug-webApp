/**
 * Created by hanwencheng on 2/26/16.
 */

import DB from '../../lib/db-interface.js';
import {logger} from '../../lib/logger'
const async = require('async')

export default function newCity(req, params) {

  logger.trace('in city list we receive params are', params)
  return new Promise((resolve, reject)=>{

    const steps = [
      getCity,
      getHouses,
    ]

    function getCity(callback){
      DB.getCityList(function(result){
        callback(null, result.data)
      }, function(err){
        callback(err.msg)
      });
    }

    function getHouses(callback){
      DB.getAll('house', {}, 0, function(result){
        return callback(null, result)
      }, function(err){
        return reject(err.msg)
      })
    }

    async.series(steps, function(err, result){
      if(err){
        reject(err)
      }else {
        resolve({
          status : true,
          isEnd : result[1].isEnd,
          cityList : result[0],
          houseList : result[1].data,
        })
      }
    })
  });
}