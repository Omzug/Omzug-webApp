/**
 * Created by hanwencheng on 1/11/16.
 */
var mongoModel = require('./model.js')
var createId = mongoModel.createId
const config = require('./config.js')
const async = require('async')
const aws = require('./aws')
const googleMap = require('./googleMap');
const Errors = config.errors;
const LOGTITLE = '[DB] ';


var House = mongoModel.House
var User = mongoModel.User
var Post = mongoModel.Post
const houseCollectionName = config.houseCollectionName;
const userCollectionName = config.userCollectionName;
const postCollectionName = config.postCollectionName;
const TYPES = [userCollectionName, houseCollectionName, postCollectionName]
const SCHEMAS = [User, House, Post]

import {logger} from './logger';

module.exports = new DatabaseInterface();

function DatabaseInterface(){
  this.initialized = false;
  var self = this;

  var db = mongoModel.initMongoDb()
  this.db = db;
  db.on('error', function(err) {
    logger.error('[DB] mongodb connection failed:', err);
  });
  db.once('open', function() {
    logger.info("[DB] mongodb connected successfully!");
    self.init();
  });
}

const DI = DatabaseInterface.prototype;

DI.init = function () {
  var self = this;
  if (this.initialized) {
    logger.info('[DB] Warning: Re-initializing');
  }
  //create the database collection if not existed.
  var collection1 = this.db.collection(houseCollectionName);
  var collection2 = this.db.collection(userCollectionName);
  logger.info('[DB] Initialized:');
  //add transaction batch
  //self.batch = House.collection.initializeOrderedBulkOp();
  //self.batchCount = 0;
  //self.batchLayer = {};
  //
  //setInterval(self.intervalSaveTxs, batchInsertInterval);

  this.initialized = true;
  insert();
};

function insert(){
  var objectId = createId("56a2a61b6dcc58c80d18bec5");
  var post = new Post({
    id : 12333,
      city: "Berlin",
      //type : 0,
      username : "heawen2003",
      owner: objectId,
      description : "anyway it is a bad idea",
      //price : 600,
      //startDate : new Date(),
      email: "heawen.cheng@gmail.com",
      images:[
      "http://media4.popsugar-assets.com/files/2014/08/08/878/n/1922507/caef16ec354ca23b_thumb_temp_cover_file32304521407524949.xxxlarge/i/Funny-Cat-GIFs.jpg",
      ]
  })

  DI.save('post', post, function(result){
    logger.debug('success insert post with ', result)
  }, function(err){
    logger.debug('fail in insert post with err' ,err)
  })
  //TODO
  logger.info("test the length with string validator")
    logger.info(/d{6,1024}/.test("iamfi"),/d{6,1024}/.test("iamfine"), /d{6,1024}/.test("iamfin"))
}

function fixBug(){
  var testUser = new User({
    username : "numberTwo",
    password : '00020',
    email : "numberTwo@test.com"
  });

  DI.save('user', testUser, function(result){
    logger.debug("test save result is", result)
  },function(error){
    logger.debug(" test save error is", error.msg)
  });

  //var promise = testUser.save();
  //promise.then(function(result, error) {
  //  logger.trace("result is", result, " error is", error)
  //}).end();
  //
  //promise.then(undefined, function(err){
  //  logger.trace('error is', err)
  //})
}

function test(){
  var testUser = new User({
    username : "numberTwo",
    password : '0002000'
  });

  testUser.save(function(err, result){
  })

  // fetch user and test password verification
  User.findOne({ username: 'numberOne' }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword('0009000', function(err, isMatch) {
      if (err) throw err;
      logger.debug('[DB-TEST] 0009000:', isMatch); // -> Password123: true
    });

    // test a failing password
    user.comparePassword('0001000', function(err, isMatch) {
      if (err) throw err;
      logger.debug('[DB-TEST] 0001000:', isMatch); // -> 123Password: false
    });
  });

  DI.get('user', {username : 'numberTwo'}, function(result){
    DI.update('user', {username : 'numberTwo'}, {password: "000100"},
      function(result) {
        logger.debug('database update success '/*, result*/)
      },
      function(err){
        logger.error('err ', err)
      }
    )
  },
  function(err){
    logger.error('err ', err)
  })

}

/**
 * save
 * {
 * __v: 0,
   password: '$2a$10$YNArqZflI1DCrnmypVeur.I3MnMu42ImY2dF7woMPVJhYkI6SXqUu',
   username: 'numberTwo',
   _id: 5694f497feaf1fb149aa8ec9
  }
 */
DI.save = function(type, data, resolve, reject){
  let steps = [
    function(callback){
      findSchema(type, callback)
    },
    function(schema, callback){
      var neu = new schema(data)
      neu.save(function(err, result) {
        if(err){
          return callback({msg : LOGTITLE + Errors.DataBaseFailed + err.message })
        }
        logSuccess(type, result)
        callback(null, result)
      });
    }
  ]

  async.waterfall(steps,function(err, result){
    if(err){
      reject(err)
    }else {
      resolve({
        status : true,
        data : result
      })
    }
  })
}

/**
 * Error Code
 * 0 : internal error
 * 1 : not found error
 * @param type
 * @param query
 * @param resolve
 * @param reject
 */
DI.get = function(type, query, resolve, reject){
  let steps = [
    function(callback){
      findSchema(type, callback)
    },
    function(schema, callback){
      schema.findOne(query).exec(function(err, result){
        if(err){
          callback({type : 0, msg : LOGTITLE + Errors.DataBaseFailed + err })
        }
        if(result == null){
          callback({type : 1 , msg : LOGTITLE + Errors.NotFound})
        }else {
          logSuccess(type, result)
          callback(null, result)
        }
      })
    }
  ]

  async.waterfall(steps, function(err, result){
    if(err){
      reject(err)
    }else {
      resolve({
        status : true,
        data : result
      })
    }
  })
}

/**
 * Error Code
 * 0 : internal error
 * @param type
 * @param query
 * @param page which will not be used, just to align the method
 * @param resolve
 * @param reject
 */
DI.getAllInit = function(type, query, page , resolve, reject){
  let steps = [
    function(callback){
      findSchema(type, callback)
    },
    function(schema, callback) {
      var queryObject = schema.find(query);
      queryObject.count(function (err, count) {
        if (err) {
          callback({type: 0, msg: LOGTITLE + Errors.DataBaseFailed + err})
        }
        callback(null, queryObject, count)
      })
    },
    function(queryObject, count, callback){
      queryObject.sort({'createdAt' : -1}).limit(config.pageSize).exec('find',function(err, result){
        if(err){
          callback({type : 0, msg : LOGTITLE + Errors.DataBaseFailed + err })
        }
        callback(null, result, count)
      })
    }
  ]

  async.waterfall(steps, function(err, result, count){
    if(err){
      reject(err)
    }else {
      resolve({
        status : true,
        data : result,
        totalNumber : count
      })
    }
  })
}

/**
 * Error Code
 * 0 : internal error
 * @param type
 * @param query
 * @param skipNumber
 * @param resolve
 * @param reject
 */
DI.getAll = function(type, query, select, skipNumber, resolve, reject){
  let steps = [
    function(callback){
      findSchema(type, callback)
    },
    function(schema, callback) {
      var queryObject = schema.find(query);
      queryObject.count(function (err, count) {
        if (err) {
          callback({type: 0, msg: LOGTITLE + Errors.DataBaseFailed + err})
        }
        callback(null, queryObject, count)
      })
    },
    function(queryObject, count, callback){
      var isEnd = false
      var expectTotalNumber = Math.ceil(skipNumber/config.pageSize) * config.pageSize + config.pageSize;
      if(expectTotalNumber >= count) isEnd = true
      // notice that page start from 0
      queryObject
        .sort({'createdAt' : -1})
        .select(select)
        .skip(skipNumber)
        .limit(expectTotalNumber-skipNumber)
        .exec('find', function(err, result){
        if(err){
          callback({type : 0, msg : LOGTITLE + Errors.DataBaseFailed + err })
        }
        callback(null, result, isEnd)
      })
    }
  ]

  async.waterfall(steps, function(err, result, isEnd){
    if(err){
      reject(err)
    }else {
      resolve({
        status : true,
        isEnd : isEnd,
        data : result,
      })
    }
  })
}

/**
 * Error Code
 * 0 : internal error
 * @param type
 * @param query
 * @param resolve
 * @param reject
 */
DI.getAllNoLimit = function(type, query, resolve, reject){
  let steps = [
    function(callback){
      findSchema(type, callback)
    },
    function(schema, callback){
      // notice taht page start from 0
      schema.find(query).sort({'createdAt' : -1}).exec(function(err, result){
        if(err){
          callback({type : 0, msg : LOGTITLE + Errors.DataBaseFailed + err })
        }
        callback(null, result)
      })
    }
  ]

  async.waterfall(steps, function(err, result){
    if(err){
      reject(err)
    }else {
      resolve({
        status : true,
        data : result
      })
    }
  })
}

/**
 * User login check
 * @param email {String} username
 * @param password {String} password
 * @param resolve promise resolve with {status : true}
 * @param reject promise error
 */
DI.userLogin =function(email, password, resolve, reject){
  logger.trace("query info is", email, password)
  User.findOne({email : email}, function(err, user) {

    if (err) {
      reject({msg : LOGTITLE + Errors.AuthFailed + err});
    }else if (user == null) {
      reject({msg : LOGTITLE + Errors.AuthFailed + " user not find"})
    }else {
      // test a matching password
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          reject({msg : LOGTITLE + Errors.AuthFailed + " error in verify the password" + err});
        }else if(!isMatch){
          reject({msg : LOGTITLE + Errors.AuthFailed + " wrong password"})
        }else{
          resolve({status : isMatch, data : user})
        }
      });
    }
  })
}

DI.delete = function(type, query, resolve, reject){
  let steps = [
    function(callback){
      findSchema(type, callback)
    },
    function(schema, callback){
      schema.remove(query).exec(function(err, result){
        if(err){
          callback({msg : LOGTITLE + Errors.DataBaseFailed + err })
        }else {
          logSuccess(type, result)
          callback(null, result)
        }
      });
    }
  ]

  //result is a big object with a lot of attributes
  async.waterfall(steps,function(err, result){
    logger.trace('err is ',err, " result is :", result)
    if(err){
      reject(err)
    }else {
      resolve({
        status : result.result.ok,
        //result: { ok: 1, n: 1 } this data show the deleted number
        data : result.result.n
      })
    }
  })
}

DI.update = function(type, query, update, resolve, reject){
  let steps = [
    function(callback){
      findSchema(type, callback)
    },
    function(schema, callback){
      schema.findOneAndUpdate(query,update,{"new" : true, "upsert" : true}).exec(function(err, updated){
        if(err){
          callback({msg : LOGTITLE + Errors.DataBaseFailed + err })
        }else {
          logSuccess(type, updated)
          callback(null, updated)
        }
      })
    }
  ]

  async.waterfall(steps,function(err, result){
    if(err){
      reject(err)
    }else {
      resolve({
        status : true,
        data : result
      })
    }
  })
}

DI.getCityList = function(resolve, reject){
  House.find().distinct('city', function(error, cities) {
    if(error)
      return reject({msg : "error in querying cities list : "  + error.toString() })

    resolve({
      status: true,
      data : cities,
    })
  });
}

/**
 * help function : give types and return schema
 * @param types
 * @param callback used for async
 * @return
 */
function findSchema(type, callback){
  var index = TYPES.indexOf(type)
  if(index >= 0 ){
    callback(null, SCHEMAS[index])
  }else{
    callback({msg : Errors.SchemaCannotFind})
  }
}

function logSuccess(type, result){
    logger.debug(LOGTITLE + 'information ' + type + ' successfully processed :' + result)
}
