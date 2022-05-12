const getSingleTransfer = (req, res) => {
    const response = {
        status: "succes",
        data:{
            messages: [
                {
                    "sender" : "person",
                    "receiver": "person",
                    "coins" : "number of coins",
                    "message" : "reason"
                }
            ]
        }
    }
    res.json(response);
}

module.exports.getSingleTransfer = getSingleTransfer;