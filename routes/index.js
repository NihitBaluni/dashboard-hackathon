/**
 * Created by nihit_baluni on 12/28/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {title: 'Nihit'});
})

module.exports = router;