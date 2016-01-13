/**
 * Created by hanwencheng on 1/11/16.
 */
var mongoModel = require('./model.js')
var House = mongoModel.House
var User = mongoModel.User
const config = require('./config.js')
const logger = require('./logger.js').logger
const async = require('async')

const houseCollectionName = config.houseCollectionName;
const userCollectionName = config.userCollectionName;
const Errors = config.errors;
const LOGTITLE = '[DB] '

const TYPES = [userCollectionName, houseCollectionName]
const SCHEMAS = [User, House]

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
};

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
      console.log('[DB-TEST] 0009000:', isMatch); // -> Password123: true
    });

    // test a failing password
    user.comparePassword('0001000', function(err, isMatch) {
      if (err) throw err;
      console.log('[DB-TEST] 0001000:', isMatch); // -> 123Password: false
    });
  });

  DI.get('user', {username : 'numberTwo'}, function(result){
    console.log('start get sucess ', result)
    DI.delete('user', {username : 'numberTwo'},
      function(result) {
        console.log(' delete sucess ', result)
      },
      function(err){
        console.log('err ', err)
      }
    )
  },
  function(err){
    console.log('err ', err)
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
      schema.save().exec(function(err, result){
        if(err){
          callback(Errors.DataBaseFailed + err )
        }else {
          logSuccess(type, result)
          callback(null, result)
        }
      })
    }
  ]

  async.waterfall(steps,function(err, result){
    if(err){
      reject(LOGTITLE + err)
    }else {
      resolve({
        status : result,
        data : data
      })
    }
  })
}


//return updated data
DI.get = function(type, query, resolve, reject){
  let steps = [
    function(callback){
      findSchema(type, callback)
    },
    function(schema, callback){
      schema.findOne(query).exec(function(err, result){
        if(err){
          callback(Errors.DataBaseFailed + err )
        }else {
          logSuccess(type, result)
          callback(null, result)
        }
      })
    }
  ]

  async.waterfall(steps,function(err, result){
    if(err){
      reject(LOGTITLE + err)
    }else {
      resolve({
        status : true,
        data : result
      })
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
          callback(Errors.DataBaseFailed + err )
        }else {
          logSuccess(type, result)
          callback(null, result)
        }
      });
    }
  ]

  async.waterfall(steps,function(err, result){
    if(err){
      reject(LOGTITLE + err)
    }else {
      resolve({
        status : result.ok,
        //result: { ok: 1, n: 1 }
        number : result.n
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
      schema.findOneAndUpdate(query,update).exec(function(err, updated){
        if(err){
          callback(Errors.DataBaseFailed + err )
        }else {
          logSuccess(type, updated)
          callback(null, updated)
        }
      })
    }
  ]

  async.waterfall(steps,function(err, result){
    if(err){
      reject(LOGTITLE + err)
    }else {
      resolve({
        status : true,
        data : result
      })
    }
  })
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
    callback(Errors.SchemaCannotFind)
  }
}

function logSuccess(type, result){
  logger.info(LOGTITLE + 'information ' + type + ' successfully saved into database' + result)
}
