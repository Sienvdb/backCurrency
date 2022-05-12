const User = require("../models/user");
const bcrypt = require("bcrypt");

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

const signup =  async (req, res) => {
    let user = new User();
    
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    if (user.firstname == "" , user.lastname == "", user.email == "") {
        res.json({
            status: "error",
            message: "Field can't be empty"
        });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    user.save((err, doc) => {

        if(err){
            res.json({
                status: "error",
                message: "Could not signup"
            });
        }

        if(!err){
            const response = {
                status: "succes",
                data:{
                    transfer: doc
                }
            }; res.json(response);
        }
    })   
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
module.exports.signup = signup;
