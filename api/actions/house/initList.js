/**
 * Created by hanwencheng on 2/19/16.
 */

import DB from '../../lib/db-interface.js';
var createId = require('../../lib/model.js').createId
var async = require('async');

export default function listInit(req, params) {

  return new Promise((resolve, reject) => {

    var steps = [

      function(callback){
        DB.getAll('house', {}, 0, function(houses){
          return callback(null, houses)
        }, function(err){
          return callback(err.msg)
        })
      },

      function(callback){
        DB.getCityList(function(cityList){
          callback(null, cityList)
        }, function(err){
          callback(err.msg)
        });
      }
    ]

    async.parallel(steps, function(err, results){
      if(err)
        return reject(err)
      resolve({
        houses : results[0].data,
        cities : results[1].data,
        isEnd : results[0].isEnd,
      })
    })
  })
}