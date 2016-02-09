import DB from '../lib/db-interface.js';

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
        console.log('success login with data', data)
        req.session.user = {email : req.body.email}; //TODO is it function well?
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
