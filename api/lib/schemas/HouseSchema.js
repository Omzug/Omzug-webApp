/**
 * Created by hanwencheng on 1/12/16.
 */
var validate = require('mongoose-validator');

//TODO this validator does not function
var stringValidator = {
  validator : function(value){
    return /d{6,1024}/.test(value)
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
    arguments: [11, 15],
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
    city :  { type : String, required : true/*, validate : stringValidator*/},
    type : {type : Number, required : true},
    price : {type: Number, required : true},
    startDate : {type : Date, required : true},
    title : {type : String, required : true},
    owner : {type : ObjectId, required : true},
    username : {type : String, required : true},

    location : { type : String/*, validate : stringValidator*/},
    size : { type :Number , required : false},
    roomNumber : {type :Number, required : false},
    caution : { type : Number , required: false},
    endDate : { type : Date, required : false},
    description : { type : String, required : false},
    email : { type : String, required : false, validate : emailValidator},
    phone : { type : String, required : false, validate : phoneValidator},
    note : { type : String, required : false},
    maximumPerson : { type : Number, required : false} ,
    images : {type : Array, required : false},

  }, { strict : true, collection : collectionName, timestamps: true});
}
