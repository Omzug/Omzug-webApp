/**
 * Created by hanwencheng on 1/11/16.
 */
var awsBucketName = 'test.omzug.com'
if(process.env.NODE_ENV === "production"){
  awsBucketName = 'omzug.com'
}

module.exports = {
  host : 'localhost:27017',
  databaseName: 'omzug',
  //please list the collection names one by one
  userCollectionName : 'user',
  houseCollectionName : 'house',
  sessionAge : 1 * 24 * 60 * 60 * 1000,
  pageSize : 9,
  awsFolder : "photos",
  awsExpire : 60,
  awsBucket : awsBucketName,
  awsPrefix : 'https://s3.eu-central-1.amazonaws.com/' + awsBucketName + '/photos/',
  tmpPath : './tmp',

  errors : {
    SchemaCannotFind : 'SchemaCannotFind: schema can not be find, please check again',
    DataBaseFailed : 'DataBaseFailed: database meet error',
    AuthFailed : 'Authentication Error',
    NotFound : 'the item not found in database',
  },

  logOptions : {
    "level": "info",
    "filename": "./logs/omzug",
    "filesize": "1000000",
    "filecount": "100"
  }
}