//make connection with mongoDB
const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const transfersSchema = new Schema({
        sender:  String, 
        receiver: String,
        coins: String,
        message:{
            type: String,
            required: true,
        },         
});

const Transfer = mongoose.model('Transfer', transfersSchema);

module.exports = Transfer;