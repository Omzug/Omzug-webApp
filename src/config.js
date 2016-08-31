require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  isDebug : false,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'http://localhost',
  apiPort: process.env.APIPORT ,
  googleMapKey : 'AIzaSyC4gQqD5iZsmbmknKIYR42sTfjcd8pl4aw',
  limitImageNumber : 5,
  limitImageSize : 5,
  pageSize : 9,
  iconPath : 'https://s3.eu-central-1.amazonaws.com/omzug.com/favicon/apple-icon.png',
  noImagePath : 'https://s3.eu-central-1.amazonaws.com/omzug.com/favicon/no-image.jpg',
  mainGifPath : "https://s3.eu-central-1.amazonaws.com/omzug.com/gif/main.gif",
  app: {
    title: 'Omzug',//head changeable
    description: '找到心仪的家',
    introduction: '基于区块链技术的去中心化租房平台。',
    introduction2:'请登陆查看房屋。',
    introductionEn : 'A convenient renting platform for Chinese student in Germany.',
    head: {
      titleTemplate: 'Omzug : %s',
      meta: [
        {name: 'description', content: '找到心仪的家'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'OMZUG'},
        {property: 'og:image', content: 'https://s3.eu-central-1.amazonaws.com/omzug.com/favicon/apple-icon.png'},
        {property: 'og:locale', content: 'zh_CN'},
        {property: 'og:title', content: 'OMZUG'},
        {property: 'og:description', content: '为在德国的中国留学生提供简易美观的租房平台。'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@hanwencheng'},
        {property: 'og:creator', content: '@hanwencheng'},
        {property: 'og:title', content: 'DeLocate'},
        {property: 'og:description', content: '为在德国的中国留学生提供简易美观的租房平台。'},
        {property: 'og:image', content: 'https://s3.eu-central-1.amazonaws.com/omzug.com/favicon/apple-icon.png'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
