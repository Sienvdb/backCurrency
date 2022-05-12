//make connection with mongoDB
const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
        firstname:{
            type: String,
            required: true,
        },
        lastname:{
            type: String,
            required: true,
        },
        username: String,
        email: String,
        password: String,
        coins: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;