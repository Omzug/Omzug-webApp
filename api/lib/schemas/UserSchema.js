/**
 * Created by hanwencheng on 1/11/16.
 */
//effect the computation time, the round of iteration
const SALT_WORK_FACTOR = 10;
var bcrypt = require('bcrypt');
var validate = require('mongoose-validator');

//refer to validator here : https://github.com/chriso/validator.js/#validators

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [5, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only'
  })
]

var passwordValidator = validate({
    validator: 'isAlphanumeric',
    arguments: [6, 50],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters, and only with numbers and alphabets'
  })

var emailValidator = validate({
  validator : 'isEmail',
  arguments: {allow_utf8_local_part: false},//TODO check if it function well
  message : "Email should following the standard email format"
})


module.exports =  function(Schema, collectionName){
  var UserSchema = new Schema({
    email : {type:String, required:true, index : {unique: true}, validator : emailValidator},
    username: { type: String, required: true, index: { unique: true } , validate: nameValidator},
    password: { type: String, required: true, validate: nameValidator },
    starList : {type : Array},
  },{ strict : true, collection : collectionName, timestamps: true});

  UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the clear text password with the hashed one
        user.password = hash;
        next();
      });
    });
  });

  UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

  return UserSchema;
}

