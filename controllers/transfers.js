const getAll = (req, res) => {
    const response = {
        status: "succes",
        data:{
            messages: [
                {
                    "username" : "username",
                    "coins" : "number of coins",
                    "request" : "get"
                }
            ]
        }
    }
    res.json(response);
}

const create = (req, res) => {
    const response = {
        status: "succes",
        data:{
            messages: [
                {
                    "username" : "username",
                    "coins" : "number of coins",
                    "request" : "post"
                }
            ]
        }
    }
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

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.getId = getId;
module.exports.getCoins = getCoins;