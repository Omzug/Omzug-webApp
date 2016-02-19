/**
 * Created by hanwencheng on 2/19/16.
 */

import DB from '../lib/db-interface.js';

export default function cityList(req, params) {

  /**
   * req.body
   * {
   *  name : name,
   *  password: password
   * }
   */
  return new Promise((resolve, reject)=>{
    DB.userLogin(req.body.email, req.body.password,
      function(data){
        console.log('success login with data', data)
        req.session.user = data.data;
        console.log('the user session information is', req.session)
        // data is the message
        return resolve(data.data);
      },
      function(err){
        req.session.user = "";
        return reject(err.msg);
      })
  });
}