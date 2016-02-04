/**
 * Created by hanwencheng on 1/9/16.
 */

export default function listHause(req, params) {
  console.log('in api list.js params are', params)

  if(params.length <= 0) {
    return new Promise((resolve, reject) => {
      resolve({
        list: [{
          city: "stuttgart",
          owner: "hanwencheng",
          title : "i got an idea",
          price : 860
        }, {
          city: "berlin",
          owner: "xinyue",
          title : "anyway it is a bad idea",
          price : 600
        }, ],
        number: 2
      });
      //reject("we don't have such endpoint")
    })
  }else {
    var totalNum = parseInt(params[0])
    return new Promise((resolve, reject) => {
      var result = []
      for (let i = 0; i < totalNum; i++) {
        result.push(i + "times visited");
      }


      setTimeout(()=> {
        resolve({
          entities: result,
          id: params[0],//which should be a string
          time: Date.now()
        });
      }, 1000)

    });
  }
}
