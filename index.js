const express = require('express')
const app = express()
const Insta = require('scraper-instagram');
const InstaClient = new Insta();

const result = '';

const yourSessionId = '6982271705%3ACqFOjDIwgfTBQH%3A13%3AAYf87RFOSbrI9-emBqZL450hctPFEeeV3aZbDL0nAQ';

InstaClient.authBySessionId(yourSessionId)
	.then(account => {result = account;} )
	.catch(err => {result = err;} );

    app.all('/', (req, res) => {
        console.log("Just got a request!")
        res.send('hello ')
    })

    app.all('/api', (req, res) => {
        console.log("Just got a request!")
        res.send(result)
    })

app.listen(process.env.PORT || 3000)