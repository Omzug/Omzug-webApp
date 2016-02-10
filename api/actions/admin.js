/**
 * Created by hanwencheng on 2/10/16.
 */

export default function getUserAdmin(req, params) {
  console.log('in admin.js params are', params)
  return new Promise((resolve, reject) => {
    resolve({
      list: [],
      number: 0
    });
    //reject("we don't have such endpoint")
  })
}
