const express = require('express')
const app = express()
const {format} = require('date-fns')

const result = 'fffff2';
const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')

var ig = require('instagram-scraping');

ig.scrapeTag('veranda').then((result2) => {
  result = result2;
});


    app.all('/', (req, res) => {
        console.log("Just got a request!")
        res.send(dateTime)
    })

 
app.listen(process.env.PORT || 3000)