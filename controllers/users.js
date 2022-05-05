const verification = (req, res) => {
    const response = {
        status: "succes",
        data:{
            messages: [
                {
                    "verification" : "is verificated",
                }
            ]
        }
    }
    res.json(response);
}

const login = (req, res) => {
    const response = {
        status: "succes",
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
