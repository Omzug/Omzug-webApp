import DB from '../../lib/db-interface.js';
import {logger} from '../../lib/logger'
import {filterPassword} from '../../utils/url'

export default function login(req) {

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
        req.session.user = data.data;
        logger.trace('the user session information is', req.session)
        // data is the message
        return resolve(filterPassword(data.data._doc));
      },
      function(err){
        req.session.user = "";
        return reject({
          error : err.msg
        });
      })
  });
}
