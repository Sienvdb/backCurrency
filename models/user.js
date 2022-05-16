//make connection with mongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

    const userSchema = new Schema({
        firstname:{
            type: String,
            required: true,
        },
        lastname:{
            type: String,
            required: true,
        },
        username:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        coins: Number
});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;