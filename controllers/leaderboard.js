const getCoins = (req, res) => {
    const response = {
        status: "succes",
        data:{
            messages: [
                {
                    "username" : "username",
                    "coins" : "number of coins",
                }
            ]
        }
    }
    res.json(response);
}

module.exports.getCoins = getCoins;