require('dotenv').config()
const accountSid = process.env.ACCOUNT_SID // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTH_TOKEN // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

const axios = require("axios");

const express = require('express')
const app = express()
const port = 8000

const options = {
  method: 'GET',
  url: 'https://quotes15.p.rapidapi.com/quotes/random/',
  params: {language_code: 'en'},
  headers: {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': process.env.API_HOST
  }
};


app.get('/', (req, res) => {
  axios.request(options).then((response) => {
    client.messages
    .create({
      body: "\nQuote: " + response.data.content + "\n " + "\nAuthor: " + response.data.originator.name + "\n " + "\nLink: " + response.data.url, 
      from: process.env.FROM_NUM,
      to: process.env.TO_NUM 
      })
    .then(message => console.log(message.sid));
  }).catch(function (error) {
      console.error(error);
  });
  res.send('Message sent!')
})


app.listen(port, () => {
  console.log(`App now listening on port ${port}`)
})


