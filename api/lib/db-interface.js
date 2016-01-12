/**
 * Created by hanwencheng on 1/11/16.
 */
var mongoModel = require('./model.js')
var House = mongoModel.House
var User = mongoModel.User
const config = require('./config.js')
const logger = require('./logger.js').logger

const houseCollectionName = config.houseCollectionName;
const userCollectionName = config.userCollectionName;

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

  test();
};


function test(){
  var testUser = new User({
    username : "numberOne",
    password : '0001000'
  });

  testUser.save(function(err) {
    if (err) throw err;

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
  });
}

