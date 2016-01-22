/**
 * Created by hanwencheng on 1/22/16.
 */

import DB from '../lib/db-interface.js';

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
    DB.get("user", {
      email : email,
      username : username,
    }, function(result){
      if(result.data.email === email){
        return reject("the email is already registered")
      }else if(result.data.username === username){
        return reject("the username is already registered")
      }
      else return reject("we meet database duplicate error")
    }, function(err){
      // if it is not in our database yet
      if(err.type === 1){
        DB.save("user", req.body, function(data){
          req.session.user = {name : username}
          return resolve(data.data)
        }, function(err){
          return reject(err.msg)
        })
      }
      //if error meet in get
      else{
        return reject(err.msg)
      }
    })

  });
}
