/**
 * Created by hanwencheng on 2/27/16.
 */

var sm = require('sitemap');

var sitemap = sm.createSitemap ({
  hostname: 'http://omzug.com',
  cacheTime: 600000,        // 600 sec - cache purge period
  urls: [
    { url: '/主页/',  changefreq: 'daily', priority: 0.7 },
    { url: '/登录/',  changefreq: 'monthly',  priority: 0.1 },
    { url: '/注册/', changefreq: 'monthly', priority: 0.1 },    // changefreq: 'weekly',  priority: 0.5
    { url: '/关于我们/', changefreq: 'monthly', priority: 0.1 }, // img: "http://urlTest.com"
  ]
});

module.exports = sitemap;