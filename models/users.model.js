const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstname: String,
    lastname: String,
    email: String,
    password: String
})


const userModel =mongoose.model ('User', userSchema)

module.exports = { userModel }

// here we are getting access to Schema class from mongoose