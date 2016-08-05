import DB from '../../lib/db-interface.js';
import {logger} from '../../lib/logger'

import urlencode from 'urlencode';

export default function listFavorite(req, params) {
  const skip = req.query.skip;
  logger.trace("req skip is", skip)
  var skipNumber = skip ? parseInt(skip) : 0

  var idList = req.body.starList
  logger.trace("request idList is" , idList)
  const select = { owner: 1, _id: 1, title :1 , price : 1, city :1 , username : 1,images :1 ,updatedAt: 1,};

  return new Promise((resolve, reject) => {
    DB.getAll('house', {_id :  { $in : idList } }, select, skipNumber, function(result){
      return resolve(result)
    }, function(err){
      return reject(err.msg)
    })
  })
}