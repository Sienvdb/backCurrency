//make connection with mongoDB
const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const transfersSchema = new Schema({
        sender:  String, 
        senderId: String,
        receiver: String,
        receiverId: String,
        coins: Number,
        date: Date,
        reason: String,
        message:{
            type: String,
            required: true,
        },         
});

const Transfer = mongoose.model('Transfer', transfersSchema);

module.exports = Transfer;