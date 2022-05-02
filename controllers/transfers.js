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
    res.json(response);
}

module.exports.getAll = getAll;
module.exports.create = create;