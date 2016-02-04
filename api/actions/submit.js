/**
 * Created by hanwencheng on 2/4/16.
 */
export default function submit(req, params) {
  console.log('in api house.js params are', params)

  var submitHouse = req.body;
  console.log('get submit request body is', submitHouse)
  return new Promise((resolve, reject) => {
    var result = []

    setTimeout(()=> {
      resolve({
          location: "地址",
          city: "城市",//which should be a string
          roomNumber: "房间数",
          size : "面积",
          price: "价格",
          caution: "押金",
          startDate : "开始日期",
          endDate : "无期限",
          description: "房屋介绍",
          title : "标题",
          owner : "所有人",
          email : "邮箱",
          phone : "请通过邮箱联系",
          type : true,
          note : "一些备注",
          maximumPerson : 3,
      });
    }, 100)

  });
}