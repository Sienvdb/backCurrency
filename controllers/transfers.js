const Transfer = require("../models/transfer");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getIdFromJWT = (req) => {
    if (req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.substring(7, req.headers.authorization.length);
    } else {
        return false;
    }

    const decoded = jwt.verify(token, "SecretWord");//config.get('jwt.secret'));
    return decoded.uid;
}

const getAllTransfersByToken = (req, res) => {

    let token = getIdFromJWT(req);
    let transferFirstname = req.body.Id;
    let transferLastname = req.body.lastname;
    //db.getCollection('users').find({"_id": "ObjectId(627cd0f54ce67d82eeb46f6b)" }
    Transfer.find({"senderId": token}, (err, docs) => {
        let sender = req.params.username;
        if (err){
            const response = {
                status: "error",
                data:{
                    transfer: docs
                }        
            }
            res.json(response);
        }
        else{
                const response = {
                    status: "success",
                    data:{
                        transfer: docs
                    }        
                }
                console.log("First function call : ", docs);
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

module.exports.getAllTransfersByToken = getAllTransfersByToken;
module.exports.create = create;
module.exports.getTransferId = getTransferId;

// transfer heeft sender_id en reciever_id
// get all transfers waar sender_id of reciever_id de id van een user zijn