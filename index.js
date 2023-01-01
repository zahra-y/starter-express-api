const express = require('express')
const app = express();

const instagram = require('instagram-scraper-api');

const ult = 'fffff2';

instagram
  .user('willsmith')
  .then((user) => console.log(user))
  .catch((err) => console.error(err));


    app.all('/', (req, res) => {
        console.log("Just got a request2!")
        res.send(ult)
    })

 
app.listen(process.env.PORT || 3000)