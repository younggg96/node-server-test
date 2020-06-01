const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/key");
// model User
const mongoose = require("mongoose");
const User = mongoose.model("user");

// Google OAuth Flow -> Google ProfileID identifies a user coming to us from the OAuth
// Incoming request with cookie -> User model instance ID identifies a user who is stored in the database
passport.serializeUser((user, done) => {
  // take our user model and put some identifying piece of information into the cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // pull it back out and turn it back into a user at some point
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Helper modules and business logic
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile ID
          // done() communicates back to a passport that maybe something went wrong or maybe something didnt quite work the way we expected
          // 1st arg null - no error; 2nd arg existingUser - the user record which is existing user
          done(null, existingUser);
        } else {
          // we dont have a user record with this ID, make a new record
          // save() take that modal instance and save it to the database for us
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
