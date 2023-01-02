const rp = require('request-promise');
const cheerio = require('cheerio');
//const url = 'https://en.wikipedia.org/wiki/George_Washington';
fs = require('fs');

const puppeteer = require('puppeteer');
const url = 'https://www.instagram.com/p/CmwOewqvd2W/?utm_source=ig_web_copy_link';


let bot = require('./puppeteer');
let cnf = require('./config/config.json');
bot();

// fs.readFile('./views/tmp.html', 'utf8', (err, html) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//   });


//setInterval(bot, cnf.settings.run_every_x_hours * 3600000);


// puppeteer
//   .launch()
//   .then(function(browser) {
//     return browser.newPage();
//   })
//   .then(function(page) {
//     return page.goto(url, {timeout: 60000}).then(function() {
//       return page.content();
//     });
//   })
//   .then(function(html) {
//     //console.log(html);

//     const $ = cheerio.load(html);

//     $('h2', html).each(function() {
//         console.log('h2',$(this).text());
//       });
      
//     fs.writeFile('./views/tmp.html', html, function (err) {
//                 if (err) return console.log(err);
//                 console.log('Hello World > helloworld.txt');
//              });

//   })
//   .catch(function(err) {
//     //handle error
//   });



// rp(url)
//   .then(function(html){
//     //success!

//     const $ = cheerio.load(html);
//     console.log( '111111111',$('a.x1i10hfl', html).length);
    
//     console.log($('.firstHeading', html).text());
//     console.log($('.bday', html).text());
    
//     fs.writeFile('./views/tmp.html', html, function (err) {
//         if (err) return console.log(err);
//         console.log('Hello World > helloworld.txt');
//     });

//   })
//   .catch(function(err){
//     console.log('err',err)
//     //handle error
//   });