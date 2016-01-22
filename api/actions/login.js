import DB from '../lib/db-interface.js';

export default function login(req) {

  console.log('get request body is', req.body)
  /**
   * req.body
   * {
   *  name : name,
   *  password: password
   * }
   */
  return new Promise((resolve, reject)=>{
    DB.userLogin(req.body.username, req.body.password,
      function(data){
        console.log('success login with data', data)
        req.session.user = {name : req.body.username}; //TODO is it function well?
        console.log('the user session information is', req.session)
        return new resolve(data);
      },
      function(err){
        req.session.user = "";
        return reject(err);
      })
  });


  console.log("now request session is ", req.session);
}
