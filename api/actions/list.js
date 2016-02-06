/**
 * Created by hanwencheng on 1/9/16.
 */

export default function listHause(req, params) {
  console.log('in api list.js params are', params)

  if(params.length <= 0) {
    return new Promise((resolve, reject) => {
      resolve({
        list: [
          {
          id : 12321,
          city: "stuttgart",
          owner: "hanwencheng",
          title : "i got an idea",
          price : 860,
          images : [
            "http://media.zenfs.com/en-US/video/video.pd2upload.com/video.yahoofinance.com@fc01f40d-8f4e-3cbc-9d8f-a7b9e79d95fd_FULL.jpg",
            "http://g-ecx.images-amazon.com/images/G/01/img15/pet-products/small-tiles/23695_pets_vertical_store_dogs_small_tile_8._CB312176604_.jpg",
          ]
        }, {
          id : 12333,
          city: "berlin",
          owner: "xinyue",
          title : "anyway it is a bad idea",
          price : 600,
          images:[
            "http://media4.popsugar-assets.com/files/2014/08/08/878/n/1922507/caef16ec354ca23b_thumb_temp_cover_file32304521407524949.xxxlarge/i/Funny-Cat-GIFs.jpg",
          ]
        }
        ],
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
