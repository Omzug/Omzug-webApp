/**
 * Created by hanwencheng on 2/3/16.
 */

export default function listHause(req, params) {
  console.log('in api house.js params are', params)

  var houseId = parseInt(params[0])
  return new Promise((resolve, reject) => {
    var result = []


    setTimeout(()=> {
      resolve({
        id : params[0],
        location: "house object",
        city: params[0],//which should be a string
        roomNumber: Date.now(),
        size : 50,
        price: 860,
        caution: 2000,
        startDate : new Date(),
        endDate : new Date(),
        description: "this is a house",
        title : "house title",
        owner : "hanwenCheng",
        email : "heawen.cheng@gmail.com",
        phone : "017684443881",
        note : "some note here"
      });
    }, 100)

  });
}