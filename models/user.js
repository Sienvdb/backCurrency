//make connection with mongoDB
const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
        firstname: String,
        lastname: String,
        username: String,
        email: String,
        password: String,
        coins: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;