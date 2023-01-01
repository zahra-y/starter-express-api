const express = require('express')
const app = express()


const ult = 'fffff2';

var ig = require('instagram-scraping');

var ult2 = ig.scrapeTag('veranda').then((result) => {
  console.log(result);
  return result;
});

console.log(ult2)

    app.all('/', (req, res) => {
        console.log("Just got a request!")
        res.send(ult)
    })

 
app.listen(process.env.PORT || 3000)