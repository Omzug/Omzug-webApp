import DB from '../../lib/db-interface.js';
var createId  = require('../../lib/model.js').createId;
import {logger} from '../../lib/logger';

export default function getPost(req, params) {
  logger.debug('in api myPost.js params are', params)

  var ownerId = createId(params[0])
  return new Promise((resolve, reject) => {
    DB.get('post', {owner : ownerId}, function(result){
      logger.debug('get my post with result ', result.data._doc )
      return resolve(result.data)
    }, function(err){
      logger.debug('find my post with error ', err)
      return reject(err.msg)
    })
  });
}