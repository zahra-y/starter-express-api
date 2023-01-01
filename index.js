const express = require('express')
const app = express()


const result = 'fffff2';

var ig = require('instagram-scraping');

ig.scrapeTag('veranda').then((result2) => {
  result = result2;
});


    app.all('/', (req, res) => {
        console.log("Just got a request!")
        res.send(result)
    })

 
app.listen(process.env.PORT || 3000)