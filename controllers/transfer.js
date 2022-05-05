const getSingleTransfer = (req, res) => {
    const response = {
        status: "succes",
        data:{
            messages: [
                {
                    "from" : "person",
                    "to": "person",
                    "coins" : "number of coins",
                    "reason" : "reason"
                }
            ]
        }
    }
    res.json(response);
}

module.exports.getSingleTransfer = getSingleTransfer;