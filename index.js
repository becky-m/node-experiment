const express = require('express');

const app = express(); //a new application that represents an express app.
//set up configuration that will listen to requests and route the HTTP requests to different handlers

app.get('/', (req, res) => {
  res.send({ bye: 'buddy' });
});

const PORT = process.env.PORT || 5000; //when our deployment server runs application it will set various environment runtime variables and configuration. This is the current port that we need to use to access the webserver.
app.listen(PORT); //tell node to look at traffic coming in on port 5000
