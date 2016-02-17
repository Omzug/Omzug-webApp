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
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  limitImageSize : 5,
  iconPath : 'https://s3.eu-central-1.amazonaws.com/omzug.com/favicon/apple-icon.png',
  noImagePath : 'https://s3.eu-central-1.amazonaws.com/omzug.com/favicon/no-image.jpg',
  app: {
    title: 'Omzug',
    description: '找到心仪的家',
    introduction: '请登录以开始',
    head: {
      titleTemplate: 'Omzug : %s',
      meta: [
        {name: 'description', content: '找到心仪的家'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Omzug'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Omzug'},
        {property: 'og:description', content: 'Locate yourself in another lovely place.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@hanwencheng'},
        {property: 'og:creator', content: '@hanwencheng'},
        {property: 'og:title', content: 'DeLocate'},
        {property: 'og:description', content: 'Locate yourself in another lovely place.'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
