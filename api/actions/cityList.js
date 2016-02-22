/**
 * Created by hanwencheng on 2/19/16.
 */

import DB from '../lib/db-interface.js';

export default function cityList(req, params) {

  console.log('in city list we receive params are', params)
  return new Promise((resolve, reject)=>{
    DB.getCityList(function(result){
      console.log('success get citylist ', result)
      resolve(result)
    }, function(err){
      reject(err.msg)
    });
  });
}