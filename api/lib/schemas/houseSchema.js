/**
 * Created by hanwencheng on 1/12/16.
 */
var validate = require('mongoose-validator');

var stringValidator = {
  validator : function(value){
    return /d{6,1024}/.test(value)
  },
  message : ' {VALUE} should be at least 6 character '
}

module.exports = function(Schema, collectionName){
  return new Schema({
    location : { type : String, required : true , validate : stringValidator},
    title :  { type : String, required : true ,validate : stringValidator},
    fee : { type : Number , required: false},
    size : { type :Number , required : false},
    user : { type : String , required : false ,validate : stringValidator},
    city :  { type : String, required : true , validate : stringValidator},
    state :  { type : String, required : true , validate : stringValidator},
    longTerm :  { type : Boolean, required : true },

  }, { strict : true, collection : collectionName});
}
