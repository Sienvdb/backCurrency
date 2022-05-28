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

const getCoinsFromJWT = (req) => {
    if (req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.substring(7, req.headers.authorization.length);
    } else {
        return false;
    }

    const decoded = jwt.verify(token, "SecretWord");//config.get('jwt.secret'));
    return decoded.coins;
}
/*
{
    "sender" : "sienie",
    "senderId" : 5,
    "receiver" : "Marie",
    "receiverId" : 6,
    "coins": 120,
    "reason" : "blbla" ,
    "message": "blabla",
    "date" :"nu"

}

    "firstname":"sien",
    "lastname":"vandenbergh",
    "username": "lolie",
    "email":"s@student.thomasmore.be",
    "password": "VGjyi.23"*/
//jwt.verify(token, "secretWord"
//.send(data))
const getAllTransfersByToken = (req, res) => {
    let tokenId = getIdFromJWT(req);
    //db.getCollection('users').find({"_id": "ObjectId(627cd0f54ce67d82eeb46f6b)" }
    Transfer.find({$or:[{senderId: tokenId}, {receiverId: tokenId}]} , function (err, docs) {
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
            res.json(response);
        }
    })
}

const create = (req, res) => {
    let senderId = getIdFromJWT(req);
    let senderCoins = getCoinsFromJWT(req);
    console.log(senderCoins);

    if (!senderId) {
        return res.json({
            "status": "error",
            "message": "You need to be logged in to make a transaction"
        });
    }

    let transfer = new Transfer(); 
    transfer.sender = req.body.sender;
    transfer.senderId = req.body.senderId;
    transfer.receiver = req.body.receiver;
    transfer.receiverId = req.body.receiverId
    transfer.coins = req.body.coins;
    transfer.reason = req.body.reason;
    transfer.message = req.body.message;
    transfer.date = Date.now();

    if(req.body.coins > senderCoins){
        return res.json({
            status: "error",
            message: "You don't have enough coins to make such a big transfer",
        })
    }else{
        console.log("ok1")

        if (req.body.receiver && req.body.coins) {
            transfer.save((err, doc) => {
                if (!err) {
                    User.findByIdAndUpdate(req.body.senderId, {$inc:{"coins": -req.body.coins}} , (err, doc) => {
                        if (!err) {
                            console.log("ok5")
                            User.findByIdAndUpdate(req.body.receiverId, { $inc: { "coins": req.body.coins } }, (err, doc) => {
                                if (!err) {
                                    console.log("ok6")
                                    res.json({
                                        status: "success",
                                        data:{
                                            transfer: doc
                                        }
                                    });
                                }else{
                                    res.json({
                                        status: "error",
                                        message: "We couldn't find this receiver in our database."
                                    })
                                }
                            });
                        }else{
                            res.json({
                                status: "error",
                                message: "We couldn't find this sender in our database."
                            })
                        }
                    });
                }
            });
        } else {
            res.json({
                "status": "error",
                "message": "Please give a receiver and the number of coins you want to send.",
            });
        }
    }
  
}

const getTransferId = (req, res) => {
    const id = req.params.id;
    
    Transfer.find({ _id: id}, function (err, docs) {
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
    
    });
}

const getCoins = (req, res) => {
    let tokenId = getIdFromJWT(req);


    if(!tokenId) {
        return res.json({
            status: "error",
            message: "No user found with this token"
        });
    }

    User.findOne({ _id: tokenId}, function (err, docs) {
        if (!err) {
            return res.json({
                "status": "success",
                "data": {
                    "coins": docs.coins,
                }
            });
        } else {
            return res.json({
                "status": "error",
                "message": "Error getting users coins",
            });
        }
    });

}

module.exports.getAllTransfersByToken = getAllTransfersByToken;
module.exports.create = create;
module.exports.getTransferId = getTransferId;
module.exports.getCoins = getCoins;

// transfer heeft sender_id en reciever_id
// get all transfers waar sender_id of reciever_id de id van een user zijn