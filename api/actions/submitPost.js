/**
 * Created by hanwencheng on 3/5/16.
 */

import DB from '../lib/db-interface.js';
const async = require('async')
import {logger} from '../lib/logger'

export default function submitPost(req) {
  /**
   * req.body
   * {
   *  email: email
   *  username : name,
   *  password: password
   *  passwordRepeat : passwordRepeat
   * }
   */
  return new Promise((resolve, reject)=>{


    const post = Object.assign({}, req.body)

    const steps = [
      //save it into our database
      function(callback){
        DB.save("post", req.body, function(data){
          logger.trace("data.data is", data.data)
          callback(null, data.data)
        }, function(err){
          return callback(err.msg)
        })
      }
    ]

    //result is an array contain 3 element
    async.waterfall(steps,function(err, result){
      if(err){
        reject(err)
      }else {
        resolve(result)
      }
    })
  });
}
