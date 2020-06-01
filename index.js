const express = require("express");
const mongoose = require("mongoose");
const keys = require('./config/key');
require('./models/User')
require("./services/passport");
// Mongo Installed && Mongoose Installed
// Need to be able to identify users who sign up and return to our application.
// We want to save the 'id' in their google profile
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });



const app = express();
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
