//make connection with mongoDB
const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const transfersSchema = new Schema({
    username:  String, // String is shorthand for {type: String}
    message: String,
    coins: String,
});

const Transfer = mongoose.model('Transfer', transfersSchema);

module.exports = Transfer;