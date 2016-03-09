/**
 * Created by hanwencheng on 3/7/16.
 */

import DB from '../../lib/db-interface.js';
var createId  = require('../../lib/model.js').createId;
import {logger} from '../../lib/logger';

export default function getPost(req, params) {
  logger.debug('in api post.js params are', params)

  var postId = createId(params[0])
  return new Promise((resolve, reject) => {
    DB.get('post', {_id : postId}, function(result){
      logger.debug('we get post with result ', postId )
      return resolve(result.data)
    }, function(err){
      logger.error('we got error is, ', err)
      return reject(err.msg)
    })
  });
}