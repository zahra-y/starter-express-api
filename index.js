const express = require('express')
const app = express()
const Insta = require('scraper-instagram');
const InstaClient = new Insta();

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('hello')
})

const yourSessionId = '6982271705%3ACqFOjDIwgfTBQH%3A13%3AAYf87RFOSbrI9-emBqZL450hctPFEeeV3aZbDL0nAQ';

InstaClient.authBySessionId(yourSessionId)
	.then(account => console.log(account))
	.catch(err => console.error('err: '+err));

app.listen(process.env.PORT || 3000)