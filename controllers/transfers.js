const Transfer = require("../models/transfer");

const getAll = (req, res) => {
    const response = {
        status: "succes",
        data:{
            messages: [
                {
                    "username" : "username",
                    "coins" : "number of coins",
                    "request" : "get"
                }
            ]
        }
    }
    res.json(response);
}

const create = (req, res) => {
    let transfer = new Transfer();
    transfer.message = "First transfer";
    transfer.username = "Marie";
    transfer.coins = "2";
    transfer.save((err, doc) => {
        if(!err){
            const response = {
                status: "succes",
                data:{
                    transfer: doc
                }
            }; res.json(response);
        }
    })
    
    
    
}

const getId = (req, res) => {
    const id = req.params.id;

    const response = {
        status: "succes",
        message: `Getting transfer with id ${id}`,
        data: {
            messages: [
                {
                    "username": "username",
                    "coins": "number of coins transferd"
                }
            ]
        }
    };
    res.json(response);
}

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.getId = getId;
