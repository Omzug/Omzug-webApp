/**
 * Created by hanwencheng on 2/27/16.
 */

var sm = require('sitemap');

var sitemap = sm.createSitemap ({
  hostname: 'http://omzug.com',
  cacheTime: 600000,        // 600 sec - cache purge period
  urls: [
    { url: '/',  changefreq: 'daily', priority: 0.4 },
    { url: '/main', changefreq : 'daily', priority : 0.3},
    { url: '/register',  changefreq: 'monthly',  priority: 0.1 },
    { url: '/login', changefreq: 'monthly', priority: 0.1 },    // changefreq: 'weekly',  priority: 0.5
    { url: '/about', changefreq: 'monthly', priority: 0.1 }, // img: "http://urlTest.com"
  ]
});

module.exports = sitemap;