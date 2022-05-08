//make connection with mongoDB
const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const transfersSchema = new Schema({
        username:  String, 
        message:{
            type: String,
            required: true,
        }, 
        coins: String,
});

const Transfer = mongoose.model('Transfer', transfersSchema);

module.exports = Transfer;