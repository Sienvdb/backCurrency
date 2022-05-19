const User = require("../models/user");
const bcrypt = require("bcrypt");
const { token } = require("morgan");
const jwt = require("jsonwebtoken");
const passport = require('passport');

const getIdFromJWT = (req) => {
    if (req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.substring(7, req.headers.authorization.length);
    } else {
        return false;
    }

    const decoded = jwt.verify(token, "SecretWord");//config.get('jwt.secret'));
    return decoded.uid;
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

const getCoins = (req, res) => {
    let tokenId = getIdFromJWT(req);
    
    if(!tokenId) {
        return res.json({
            status: "error",
            message: "No user found with this token"
        });
    }

    User.findOne({ _id: tokenId}, function (err, docs) {
        if (!err) {
            return res.json({
                "status": "success",
                "data": {
                    "coins": docs.coins,
                }
            });
        } else {
            return res.json({
                "status": "error",
                "message": "Error getting users coins",
            });
        }
    });

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
 
        // Return response with error
        res.json({
            login: false,
            data: 'error'
        });
    }
};


module.exports.login = login;
module.exports.signup = signup;
module.exports.getValuesByToken = getValuesByToken;
module.exports.getCoins = getCoins;
