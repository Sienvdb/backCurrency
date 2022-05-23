const User = require("../models/user");
const bcrypt = require("bcrypt");
const { token } = require("morgan");
const jwt = require("jsonwebtoken");
const passport = require('passport');

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
                username: user.username,
                coins: user.coins
            }, "SecretWord");

                res.json({
                    status: "success",
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
                username: user.username,
                coins: user.coins
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

const getIdByUsername = async (req, res) => {
    const username = req.params.username;
    User.findOne({ username: username}, function (err, docs) {
        if (err){
            const response = {
                status: "error",
                data:{
                    transfer: docs
                }        
            }
            res.json(response);
        }
        else{
            const response =({
                "status": "success",
                "data": {
                    "id": docs._id,
                }
            });
            res.json(response);
        }
    })

}

const getValuesByToken = async (req, res) => {
    // Get token value to the json body
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    console.log(token)
    console.log("ok")
    // If the token is present
    if(token){
 
        // Verify the token using jwt.verify method
        const decode = jwt.verify(token, 'SecretWord');
 
        //  Return response with decode data
        res.json({
            login: true,
            data: decode
        });
    }else{
 
        // Return response with errorreq.headers.authorization.substring
        res.json({
            login: false,
            data: 'error'
        });
    }
};


module.exports.login = login;
module.exports.signup = signup;
module.exports.getIdByUsername = getIdByUsername;
module.exports.getValuesByToken = getValuesByToken;

