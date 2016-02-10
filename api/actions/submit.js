/**
 * Created by hanwencheng on 2/4/16.
 */
var formidable = require('formidable');
export default function submit(req, params) {
  console.log('in api house.js params are', params)

  var submitHouse = req.body;
  var form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    //var data  = submitHouse.data;
    //var images = submitHouse.images;

    //images.forEach(function(file){
    //  console.log('file name and size are', file.name, file.size)
    //})

    form.parse(req, function(err, fields, files){
      //files.forEach(function(file){
      //  console.log("file name is", file.name, file.size)
      //})
      console.log("files are ", files)
      console.log("and field array is", fields )
    })

    setTimeout(()=> {
    //  resolve(
    //    {
    //      status : "success",
    //      data:{
    //        id : "2016",
    //        location: "地址",
    //        city: "城市",//which should be a string
    //        roomNumber: "房间数",
    //        size : "面积",
    //        price: "价格",
    //        caution: "押金",
    //        startDate : "开始日期",
    //        endDate : "无期限",
    //        description: "房屋介绍",
    //        title : "标题",
    //        owner : "所有人",
    //        email : "邮箱",
    //        phone : "请通过邮箱联系",
    //        type : true,
    //        note : "一些备注",
    //        maximumPerson : 3,
    //        images:[],
    //      }
    //    });
    //}, 2000)
      reject("this is a test error")
    }, 2000)

  });
}