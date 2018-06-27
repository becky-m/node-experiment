const passport = require('passport'); //handle authentication using passport.
const GoogleStrategy = require('passport-google-oauth20').Strategy; //how to auth users with google oAuth.
const mongoose = require('mongoose');
const keys = require('../config/keys.js'); //get keys from the configuration.

const User = mongoose.model('users'); //make sure user model is required before we define this service. Order of execution bug otherwise.

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser); //we have a record of this user.
        } else {
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
); //Creates a new instance of the google passport strategy.
