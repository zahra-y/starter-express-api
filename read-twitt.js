const cheerio = require('cheerio');
fs = require('fs');
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const Hashtag = require('./models/Hashtag')
const Author = require('./models/Author')

let run = async function () {

    connectDB();

    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB')
        //app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })

    mongoose.connection.on('error', err => {
        console.log(err)
        //logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
    })

    fs.readFile('./views/twitter_page.html', 'utf8', (err, html) => {
            
        if (err) {
            console.error(err);
            return;
        }
        
        var $ = cheerio.load(html);
        var contents = [];

        $('article', html).each(async function() {
            
            article_content = $(this).find('div[class="css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0"]').text();
            var author = '';
            var ltr_hashtag = '';
            var ltr_array = [];
            var rtl_hashtag = '';
            var rtl_array = [];
            var hashtags_arr = [];
            var hashtags = '';
            
            if(!contents.includes(article_content)){
                
                contents.push(article_content);
               // console.log('article_content',article_content)
                $(this).find('div[class="css-901oao r-1awozwy r-18jsvk2 r-6koalj r-37j5jr r-a023e6 r-b88u0q r-rjixqe r-bcqeeo r-1udh08x r-3s2u2q r-qvutc0"]', html).each(function() {
                    author = $(this).text();
                });    
            
                $(this).find('a[dir="ltr"]', html).each(function() {
                
                    var hashtag = $(this).text();

                    if( hashtag.includes('#') ){
                        ltr_array.push(hashtag);                        
                    }
                });   
                ltr_hashtag = ltr_array.join(' , ');
                hashtags_arr = ltr_hashtag;
                
                $(this).find('a[dir="rtl"]', html).each(function() { 
                
                    var hashtag = $(this).text();

                    if( hashtag.includes('#') ){
                        rtl_array.push(hashtag);
                    }
                });   

                rtl_hashtag = rtl_array.join(' , ');
                
                hashtags_arr = ltr_array.concat(rtl_array);
                hashtags = hashtags_arr.join(' , ');

                //save in DB
                const save_hashtag = await Hashtag.create({ ltr_hashtag , rtl_hashtag, text : article_content , 
                                  author , social_media : 'twitter' , hashtags , country:'IR' })
                if(!save_hashtag){

                }

                const save_author = await Author.create({ author , social_media : 'twitter' , country:'IR' })
                if(!save_author){

                }
                //console.log('hashtags',hashtags)
                
            }

        });

    });

};

module.exports = run;