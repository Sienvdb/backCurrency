const Transfer = require("../models/transfer");
const User = require("../models/user");

const getAllById = (req, res) => {
    let transferFirstname = req.body.Id;
    let transferLastname = req.body.lastname;
    Transfer.find({"sender._id": transferFirstname}, (err, docs) => {
        if(!err){
            const response = {
                status: "succes",
                data:{
                    data:{
                        transfer: docs
                    }
                }
            };
            res.json(response);
        }else{
            const response = {
                status: "error",
                data:{
                    transfer: docs
                }        
            }
            res.json(response);
        }
    })   
}

const create = (req, res) => {
    let transfer = new Transfer();
    
    transfer.sender = req.body.sender;
    transfer.receiver = req.body.receiver;
    transfer.coins = req.body.coins;
    transfer.date = req.body.date;
    transfer.message = req.body.message;

    transfer.save((err, doc) => {
        if(err){
            res.json({
                status: "error",
                message: "Could not make a transfer"
            });
        }

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

const getTransferId = (req, res) => {
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

module.exports.getAllById = getAllById;
module.exports.create = create;
module.exports.getTransferId = getTransferId;
