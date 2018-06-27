const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
require('./models/user'); //include my user object. Make sure user model is required before we define this service. Order of execution bug otherwise.
require('./services/passport'); //require passport services for google oAuth.

const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express(); //a new application that represents an express app.
//set up configuration that will listen to requests and route the HTTP requests to different handlers
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] //can provide multiple keys if needed, place key inside of array.
  })
);

app.use(passport.initialize()); //iniit passport to handle cookies.
app.use(passport.session()); //start the session.

authRoutes(app); //call auth routes and pass in the app express instance.

const PORT = process.env.PORT || 5000; //when our deployment server runs application it will set various environment runtime variables and configuration. This is the current port that we need to use to access the webserver.
app.listen(PORT); //tell node to look at traffic coming in on port 5000
