/**
 * Created by hanwencheng on 1/11/16.
 */

module.exports = {
  host : 'localhost:27017',
  databaseName: 'omzug',
  //please list the collection names one by one
  userCollectionName : 'user',
  houseCollectionName : 'house',
  pageSize : 18,
  awsFolder : "photos",
  awsExpire : 60,
  awsPrefix : 'https://s3.eu-central-1.amazonaws.com/omzug.com/photos/',
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