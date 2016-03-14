/**
 * Created by hanwencheng on 1/22/16.
 */

import DB from '../../lib/db-interface.js';
const async = require('async')
import {logger} from '../../lib/logger'

export default function register(req) {
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


    const email = req.body.email
    const username = req.body.username

    const steps = [
      //checking register email.
      function(callback){
        DB.get('user', {email : email},
        function(result){
          if(result.data.email === email){
            callback("The email is already registered")
          }else callback("We meet database duplicate error")
        },
        function(err){
          if(err.type === 1){
            callback()
          }else{
            callback(err.msg)
          }
        })
      },
      //checking register username
      function(callback){
        DB.get('user', {username : username},
          function(result){
            if(result.data.username === username){
              callback("The username is already registered")
            }else callback("we meet database duplicate error")
          },
          function(err){
            if(err.type === 1){
              callback()
            }else{
              callback(err.msg)
            }
          })
      },
      //finally save it into our database
      function(callback){
        DB.save("user", req.body, function(data){
          req.session.user = {name : username}
          logger.trace("data.data is", data.data)
          callback(null, data.data)
        }, function(err){
          return callback(err.msg)
        })
      }
    ]

    //result is an array contain 3 element
    async.series(steps,function(err, result){
      if(err){
        reject(err)
      }else {
        resolve(result[2])
      }
    })
  });
}
