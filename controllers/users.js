const User = require("../models/user");
const bcrypt = require("bcrypt");
const { token } = require("morgan");
const jwt = require("jsonwebtoken");

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

    if (user.firstname == "" , user.lastname == "", user.email == "", user.password == "") {
        res.json({
            status: "error",
            message: "Field can't be empty"
        });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    if(!user.email.includes("@student.thomasmore.be")) {
        res.json({
            status: "error",
            message: "Email must be Thomas More email"
        });
    } else {

        user.save().then(result => {
                let token = jwt.sign({
                    uid: result._id, 
                    username: result.username
                }, "SecretWord");
                res.json({
                    status: "succes",
                    data:{
                        token: token,
                    }
                });
        }).catch(error => {    
                res.json({
                    status: "error",
                    message: "Could not signup"
                });
    
        })
    }

    
}

const login = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({email: body.email});
    
    if(user) {
        const validatePassword = await bcrypt.compare(body.password, user.password);

        if(validatePassword) {
            res.json({
                status: "success",
                message: "Valid password"
            });
        } else {
            res.json({
                status: "error",
                message: "Wrong password"
            });
        }
    } else {
        res.json({
            status: "error",
            message: "No user found with this email"
        });
    }
}

module.exports.verification = verification;
module.exports.login = login;
module.exports.signup = signup;
