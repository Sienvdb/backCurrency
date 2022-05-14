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

    if (user.firstname == "") {
        res.json({
            status: "error",
            message: "Firstname can't be empty"
        });
    }

    if (user.lastname == "") {
        res.json({
            status: "error",
            message: "Lastname can't be empty"
        });
    }

    if (user.username == "") {
        res.json({
            status: "error",
            message: "Username can't be empty"
        });
    }

    if (user.password == "") {
        res.json({
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

        user.save((err, doc) => {

            if(err){
                res.json({
                    status: "error",
                    message: "Could not signup"
                });
            }
    
            if(!err){
                const response = {
                    status: "success",
                    data:{
                        transfer: doc
                    }
                }; res.json(response);
            }
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
            res.json({
                status: "success",
                message: "Valid password"
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

module.exports.verification = verification;
module.exports.login = login;
module.exports.signup = signup;
