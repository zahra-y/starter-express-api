const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
fs = require('fs');

//let ops = require('../src/pouchDB');
let cnf = require('./config/config-twitt.json');

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var count_scroll = 0;
            var distance = 100;
            var timer = setInterval(() => {
                count_scroll = parseInt(count_scroll + 1);
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if( count_scroll<10 ){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

let run = async function () {

    //set up Puppeteer
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    
    //await page.setUserAgent("Mozilla/5.0 (X11; CrOS x86_64 10066.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36");
    page.setViewport({width: 1200, height: 800});
    
    // Load Instagram
    await page.goto('https://twitter.com/i/flow/login',{waitUntil:'networkidle2'});

    await page.waitForTimeout(5000);
    await page.screenshot({ path: `screenshots/1.jpeg` }); 
       
    //console.log('page_content',page_content)

    // // Login
    await page.click(cnf.selectors.username_field); 
    await page.keyboard.type(cnf.email);

    await page.waitForSelector('a[href="/messages"]', {timeout: 1000000});

    console.log('login');

    await page.waitForTimeout(5000);
    await page.waitForSelector('article', {timeout: 1000000});

    await page.screenshot({ path: `screenshots/2.jpeg` });

    await autoScroll(page);

    await page.screenshot({ path: `screenshots/3.jpeg`, fullPage: true });

    const html = await page.content();
    fs.writeFile('./views/twitter_page.html', html, function (err) {
        if (err) return console.log(err);
           console.log('Hello World > helloworld.txt');
       });

        // var $ = cheerio.load(html);

        // var ltr_hashtag = '';
        // var rtl_hashtag = '';

        // $('div[class="css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0"]', html).each(function() {
            
        //     article_content = $(this).text();
        //     console.log('article_content',article_content);
           
        //     $(this).find('a[dir="ltr"]', html).each(function() {
            
        //         ltr_hashtag = $(this).text();

        //         if( ltr_hashtag.includes('#') ){
        //             console.log('ltr_hashtag',ltr_hashtag);
        //         }
        //     });    
            
        //     $(this).find('a[dir="rtl"]', html).each(function() { 
            
        //         rtl_hashtag = $(this).text();

        //         if( rtl_hashtag.includes('#') ){
        //             console.log('rtl_hashtag',rtl_hashtag);
        //         }
        //     });    

        // });



                      console.log('end');
    // Close browser
    //browser.close();

};

module.exports = run;