const express = require('express')
const app = express()


const ult = 'fffff2';

var ig = require('instagram-scraping');

ig.scrapeTag('veranda').then((result) => {
  console.log(result);
  ult = result;
});

console.log(ig)

    app.all('/', (req, res) => {
        console.log("Just got a request!")
        res.send(ult)
    })

 
app.listen(process.env.PORT || 3000)