
const passport = require('passport');
const User = require('../models/user');


//webtoken
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SecretWord';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("yes");

    User.findOne({_id: jwt_payload.uid}, function(err, user) {

        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;