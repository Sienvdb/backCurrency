const verification = (req, res) => {
    const response = {
        status: "success",
        data:{
            messages: [
                {
                    "username" : "username",
                    "coins": "coins",
                    "transactions": "latest transactions"
                }
            ]
        }
    }
    res.json(response);
}

const login = (req, res) => {
    const response = {
        status: "success",
        data:{
            messages: [
                {
                    "username" : "username",
                }
            ]
        }
    }
    res.json(response);
}

module.exports.verification = verification;
module.exports.login = login;
