/**
 * Created by hanwencheng on 1/12/16.
 */
module.exports = function(Schema, collectionName){
  return new Schema({
    location : { type : String, required : true },
    title :  { type : String, required : true },
    fee : { type : Number , required: false},
    size : { type :Number , required : false},
    user : { type : String , required : false},
    city :  { type : String, required : true },
    state :  { type : String, required : true },
    longTerm :  { type : Boolean, required : true },

  }, { strict : true, collection : collectionName});
}
