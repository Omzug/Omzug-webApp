/**
 * Created by hanwencheng on 2/3/16.
 */
import DB from '../../lib/db-interface.js';
var createId  = require('../../lib/model.js').createId;
import {logger} from '../../lib/logger';

export default function getHouse(req, params) {
  logger.debug('in api house.js params are', params)

  var houseId = createId(params[0])
  return new Promise((resolve, reject) => {
    DB.get('house', {_id : houseId}, function(result){
      logger.debug('we get house with result ', houseId )
      return resolve(result.data)
    }, function(err){
      logger.error('we got error is, ', err)
      return reject(err.msg)
    })
  });
}