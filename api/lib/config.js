/**
 * Created by hanwencheng on 1/11/16.
 */

module.exports = {
  host : 'localhost:27017',
  databaseName: 'omzug',
  houseCollectionName : 'house',
  userCollectionName : 'user',
  logOptions : {
    "level": "info",
    "filename": "./logs/omzug",
    "filesize": "1000000",
    "filecount": "100"
  }
}