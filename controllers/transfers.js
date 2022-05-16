const Transfer = require("../models/transfer");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
//test token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjgwZWQ1ODFmODg2MjljMTc3OGI4NTQiLCJ1c2VybmFtZSI6InNpZW52ZGIiLCJpYXQiOjE2NTI3MDQ0MjJ9.-MdkkdeE8Vgncc7UiVeOOb4883n7MijtrcRszxLKuo4
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

    let tokenId = getIdFromJWT(req);
    //db.getCollection('users').find({"_id": "ObjectId(627cd0f54ce67d82eeb46f6b)" }
    Transfer.find({senderId: tokenId}, function (err, docs) {
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
    transfer.senderId = req.body.senderId;
    transfer.receiver = req.body.receiver;
    transfer.receiverId = req.body.receiverId
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