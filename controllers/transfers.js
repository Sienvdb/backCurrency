const getAll = (req, res) => {
    const response = {
        status: "succes",
        data:{
            messages: [
                username = "username",
                coins = "number of coins" 
            ]
        }
    }
    res.json(response);
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
module.exports.getId = getId;