const User = require("../models/user");
const bcrypt = require("bcrypt");
const { token } = require("morgan");
const jwt = require("jsonwebtoken");
const passport = require('passport');

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
    user.coins = 100;

    if(user.password == "") {
        return res.json({
            status: "error",
            message: "Password can't be empty"
        });
    } 
    //generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    //set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);

    //check to make sure email is Thomas More email
    if(!user.email.includes("@student.thomasmore.be")) {
        res.json({
            status: "error",
            message: "Email must contain @student.thomasmore.be"
        });
    } else {

        user.save().then(result => {
            let token = jwt.sign({
                uid: user._id, 
                username: user.username
            }, "SecretWord");
        

                console.log(result)
                res.json({
                    status: "succes",
                    data:{
                        "token": token,
                    }
                });
        }).catch(error => {    
                res.json({
                    status: "error",
                    message: "Could not signup, check if all input fields are filled in"
                });
    
        })
    }

    
}

const login = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({email: body.email});
    if(user) {
        //check if user password and hashed password are the same
        const validatePassword = await bcrypt.compare(body.password, user.password);

        if(validatePassword) {
            let token = jwt.sign({
                uid: user._id, 
                username: user.username
            }, "SecretWord");
        
        
            res.json({
                status: "success",
                token: token
            });
        } else {

            res.json({
                status: "error",
                message: "Password is incorrect"
            });
        }
    } else {

        res.json({
            status: "error",
            message: "No user found with this email"
        });
    }
}

const login2 = async (req, res) => {
    const body= req.body;
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        console.log(User);
        console.log(result);
        console.log(result.user);
        console.log(req.body.username);
        console.log(req.body.password);
        if(result.user) {    
            const validatePassword = bcrypt.compare(body.password, user.password);
            console.log(validatePassword);

            if(validatePassword) {
                let token = jwt.sign({
                    uid: result.user._id, 
                    username: result.user.username
                }, "SecretWord");
    
                return res.json({
                    status: "success",
                    data: {
                        "token": token
                    }
                });
            } else {
                res.json({
                    status: "failed",
                    message: "Wrong password"
                });
            }
        } else {
            res.json({
                status: "failed",
                message: "No user found with this email"
            });
        }    
    });
    
}


module.exports.verification = verification;
module.exports.login = login;
module.exports.signup = signup;
