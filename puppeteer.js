const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
fs = require('fs');

//let ops = require('../src/pouchDB');
let cnf = require('./config/config.json');

let run = async function () {

    // set up Puppeteer
    const browser = await puppeteer.launch({
        headless: false,
        args: [
        '--window-size=1920,1080'
        ]
    });
    const page = await browser.newPage();
    
    await page.setUserAgent("Mozilla/5.0 (X11; CrOS x86_64 10066.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36");
    //page.setViewport({width: 1200, height: 764});

    // Load Instagram
    await page.goto('https://www.instagram.com/accounts/login/',{waitUntil:'networkidle2'});

    await page.waitForSelector(cnf.selectors.username_field, {timeout: 100000});

    //await page.waitForTimeout(5000);
    await page.screenshot({ path: `screenshots/1.jpeg` }); 

       
    //console.log('page_content',page_content)
    //await page.click(cnf.selectors.home_to_login_button);
    //await page.waitForTimeout(2500);

    // Login
    await page.click(cnf.selectors.username_field);
    await page.keyboard.type(cnf.username);
    await page.click(cnf.selectors.password_field);
    await page.keyboard.type(cnf.password);

    await page.screenshot({ path: `screenshots/2.jpeg` });

    
    await page.click(cnf.selectors.login_button);  
    
    //await page.waitForTimeout(2500);
    await page.screenshot({ path: `screenshots/3.jpeg` });
    //await page.waitForNavigation();

   

    // await page.waitForTimeout(2500);
    // //
    // const url = 'https://www.instagram.com/dotnetcrunch/';

              
    // const html = await page.goto(url, {timeout: 60000}).then(function() {
    //      return page.content();
    //  });
    //  await page.waitForTimeout(2500);
    //  await page.screenshot({ path: `screenshots/github-profile.jpeg` });

    //  fs.writeFile('./views/public_page.html', html, function (err) {
    //     if (err) return console.log(err);
    //        console.log('Hello World > helloworld.txt');
    //    });

    // var $ = cheerio.load(html);
    // var meta_post = $('meta[name=description]', html)

    // var post_content = meta_post[0]['attribs']['content'];

    // var regexp = /(^|\W)(#.*?(?= #|$))/ig
    // result = post_content.match(regexp);

    // var hashtags = '';
    // if(result){
    //     hashtags = result.join('  ,  ')
    // }

    // console.log(hashtags);

    // const $ = cheerio.load(html);
    // $('meta[name=description]', html).each(function() {
    //          console.log('_a9z6',$(this).Element );
    //           });
              
    // fs.writeFile('./views/tmp.html', html, function (err) {
    //     if (err) return console.log(err);
    //     console.log('Hello World > helloworld.txt');
    // });

                      console.log('end');
    // Close browser
    //browser.close();

};

module.exports = run;