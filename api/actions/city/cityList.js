/**
 * Created by hanwencheng on 2/19/16.
 */

import DB from '../../lib/db-interface.js';
import {logger} from '../../lib/logger'

export default function cityList(req, params) {

  logger.trace('in city list we receive params are', params)
  return new Promise((resolve, reject)=>{
    DB.getCityList(function(result){
      logger.trace('success get citylist ', result)
      resolve(result)
    }, function(err){
      reject(err.msg)
    });
  });
}