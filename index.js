const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./config/key')
const app = express();

passport.use(new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile)
        console.log(" "+ done)
    }

));

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)

// client ID 758725786283-ek0a6t676ic0esubh0q64uh9tqp5g8jv.apps.googleusercontent.com
// Key LBH2r1ga9ZEVpANFcu-SisZp

// app.get('/', (req, res) => {
//     res.send({ bye: 'buddy' });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT)