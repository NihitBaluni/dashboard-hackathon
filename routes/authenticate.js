var express = require('express');
var router = express.Router();

module.exports = function(passport){
    router.get('/success', function(req, res) {
        console.log(1111);
        res.send({state:'success', user: req.user ? req.user : null} );
    });
    router.get('/failure', function(req, res) {
        console.log(222222);
        res.send({state:'failure', user: null, message: 'invalid username'});
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //log out
    router.get('/signout',function(req, res) {
        console.log('inside logout');
        req.logout();
        res.send({state: 'success', user:null, message: 'logout success'});
    });

    return router;
}
