var validate = require('mongoose-validator');

//TODO this validator does not function
var stringValidator = {
  validator : function(value){
    return typeof value == "string" && value.length >= 6
  },
  message : ' {VALUE} should be at least 6 character '
}

var emailValidator = validate({
  validator: 'isEmail',
  message : "email format not qualified"
})

var phoneValidator = [
  validate({
    validator : 'isLength',
    arguments: [11, 16],
    message : "should use normal germany phone number, 11 to 15 digits"
  }),
  validate({
    validator : 'isNumeric',
    message : "phone number should only contain numbers"
  })
]

module.exports = function(Schema, collectionName){
  var ObjectId = Schema.ObjectId;
  return new Schema({
    city :  { type : String, required : true, index: true/*, validate : stringValidator*/},
    username : {type : String, required : true},
    owner : {type : ObjectId, required : true},
    description : { type : String, required : true},

    email : { type : String, required : false, validate : emailValidator},
    phone : { type : String, required : false, validate : phoneValidator},
    wechat : {type : String, required : false},
    images : {type : Array, required : false},

    startDate : {type : Date, required : true},//TODO
    endDate : { type : Date, required : false},
    major : {type : String, required : false},

  }, { strict : true, collection : collectionName, timestamps: true});
}