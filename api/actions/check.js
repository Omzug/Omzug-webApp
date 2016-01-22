/**
 * Created by hanwencheng on 1/22/16.
 */

import DB from '../lib/db-interface.js';

export default function check(req) {

  console.log('get request query is', req.query)
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
     return resolve("i am fine")
  });
}