
let cnf = require('./config/config.json');

const puppeteer = require('puppeteer');
fs = require('fs');

//let ops = require('../src/pouchDB');

let run = async function () {

    // set up Puppeteer
    const browser = await puppeteer.launch({
        headless: cnf.settings.headless,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    page.setViewport({width: 1200, height: 764});

    // Load Instagram
    await page.goto('https://www.instagram.com');
    await page.waitForTimeout(2500);
    //var page_content = page.content();
    //console.log('page_content',page_content)
    //await page.click(cnf.selectors.home_to_login_button);
    //await page.waitForTimeout(2500);

    // Login
    await page.click(cnf.selectors.username_field);
    await page.keyboard.type(cnf.username);
    await page.click(cnf.selectors.password_field);
    await page.keyboard.type(cnf.password);

    //await page.waitForNavigation();
    await page.click(cnf.selectors.login_button);    


    //
    const url = 'https://www.instagram.com/dotnetcrunch/';

    await page.goto(url, {timeout: 60000});

    //await page.waitForTimeout(5000);
    await page.waitForSelector('._ac7v', {timeout: 100000});
    
    const public_page = await page.content();

    const result = await page.evaluate(() => {
        // Get elements into a NodeList
        const elements = document.querySelectorAll('._ac7v');
    
        // Convert elements to an array, 
        // then for each item of that array only return the href attribute
        const linksArr = Array.from(elements).map(link => link.href);
    
        return linksArr;
    });
    console.log('result',result);

    fs.writeFile('./views/public_page.html', public_page, function (err) {
          if (err) return console.log(err);
             console.log('Hello World > helloworld.txt');
         });

        
    // var $ = cheerio.load(public_page);
    
    // $('.x1i10hfl', public_page).each(function() {
    //     console.log('h2',$(this).href());
    // });

              
    // const html = await page.goto(url, {timeout: 60000}).then(function() {
    //     return page.content();
    // });
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
    browser.close();

};

run();

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