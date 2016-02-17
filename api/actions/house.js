/**
 * Created by hanwencheng on 2/3/16.
 */
import DB from '../lib/db-interface.js';
var createId  = require('../lib/model.js').createId;

export default function getHouse(req, params) {
  console.log('in api house.js params are', params)

  var houseId = createId(params[0])
  return new Promise((resolve, reject) => {
    DB.get('house', {_id : houseId}, function(result){
      console.log('we get result here is', result)
      return resolve(result.data)
    }, function(err){
      return resolve(err.msg)
    })
  });
}