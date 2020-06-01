const mongoose = require('mongoose');
const { Schema } = mongoose;

// Use Mongoose to create a new collection in Mongo called 'users'
// (Collections are created by making a 'model class')
// When user signs in, save record to the 'users' collection
const userSchema = new Schema({
    googleId: String
});

mongoose.model('user', userSchema);