let Transfer = require ("../models/transfer")

const getSingleTransferBySender = (req, res) => {
Transfer.find({ "sender": 'sien'}, function (err, doc) {
    if (err){
        const response = {
            status: "error",
            data:{
                transfer: doc
            }        
        }
        res.json(response);
    }
    else{
        const response = {
            status: "success",
            data:{
                transfer: doc
            }        
        }
        console.log("First function call : ", doc);
        res.json(response);

    }

});

}

module.exports.getSingleTransferBySender = getSingleTransferBySender;