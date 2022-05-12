let Transfer = require ("../models/transfer")

const getAllTransfersBySender = (req, res) => {
    let transferSender = req.body.sender;
    Transfer.find({ "sender": transferSender}, function (err, docs) {
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

module.exports.getAllTransfersBySender = getAllTransfersBySender;