const signup = (req, res) => {
    const response = {
        status: "succes",
        data:{
            messages: [
                {
                    "message" : "Signed in!",
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

module.exports.signup = signup;
module.exports.login = login;