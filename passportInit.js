var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var users = mongoose.model('User');
console.log('application running');
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        console.log('serialize user');
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        console.log('deserialize user');
        users.findById(id, function(err, user) {
            if (err) {
                return done('deserializer error', false)
            }
            if (!user) {
                return done('user not found', false)
            }
            return done(null, user);
        })
    });
    passport.use('signup', new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password',
            passReqToCallback: true
        },

        function(req, userName, password, done) {
            users.findOne({username: userName}, function(err, user){
                if (err){
                    return done('DB error' +  err , false);
                }
                if (user) {
                    return done('userName already taken', false);
                }
                var newUser = new users();
                newUser.username = userName;
                newUser.password = createHash(password);
                newUser.save(function(err, user) {
                    if (err) {
                        return done('DB failure', false);
                    }
                    return done(null, user);
                });
            });

        }
    ));

    passport.use('login', new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, userName, password, done) {
            users.findOne({username: userName}, function(err, user) {
                if (err) {
                    return done('DB exception', false);
                }
                if (!user) {
                    return done('user not found',null, false)
                }
                console.log(11111);
                if (!isValidPassword(user, password)) {
                    return done('invalid password', false);
                }
                return done(null, user);
            });
        }
    ));

    var createHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }

    var isValidPassword = function (user, password) {
        return bcrypt.compareSync(password, user.password);
    }
}