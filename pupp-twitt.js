const puppeteer = require('puppeteer');
fs = require('fs');

let cnf = require('./config/config-twitt.json');

let run = async function () {

    //set up Puppeteer
    const browser = await puppeteer.launch({
        headless: false,
    });
    //const page = await browser.newPage();
    
    //await page.setUserAgent("Mozilla/5.0 (X11; CrOS x86_64 10066.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36");
    // page.setViewport({width: 1200, height: 800});
    
    // // Load Instagram
    // await page.goto('https://twitter.com/i/flow/login',{waitUntil:'networkidle2'});

    // await page.waitForTimeout(5000);
       
    // // // Login
    // await page.waitForSelector(cnf.selectors.username_field, {timeout: 1000000});
    // await page.click(cnf.selectors.username_field); 
    // await page.keyboard.type(cnf.email);

    // await page.waitForSelector('a[href="/messages"]', {timeout: 1000000});

    // console.log('login');

    // await page.waitForTimeout(5000);
    // await page.waitForSelector('article', {timeout: 1000000});
    
    // const html = await page.content();
    // fs.appendFile('./views/twitter_page.html', html, function (err) {
    //     if (err) return console.log(err);            
    // });

    // var count_scroll = 1;

    // for(i=0 ; i<count_scroll ; i++){

    //     console.log('count_scroll',i);
    //     await page.evaluate(async () => {
    //         var distance = 2000;
    //         window.scrollBy(0, distance);
    //     });

    //     await page.waitForTimeout(5000);

    //     const html = await page.content();
    //     fs.appendFile('./views/twitter_page.html', html, function (err) {
    //         if (err) return console.log(err);            
    //     });

    // }


                      console.log('end');
    // Close browser
    //browser.close();

};

module.exports = run;