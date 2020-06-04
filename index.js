const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/key");
require("./models/User");
require("./services/passport");
// Mongo Installed && Mongoose Installed
// Need to be able to identify users who sign up and return to our application.
// We want to save the 'id' in their google profile
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // it will randomly pick one to use to encrypt any given cookie
    keys: [keys.cookieKey]
  })
);

// use cookie to handle auth
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
