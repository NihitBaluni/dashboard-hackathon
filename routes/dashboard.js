var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bugs = mongoose.model('Bugs');

router.route('/bugs')
    .get(function(req, res) {
        console.log('inside dashboard bugs api');
        bugs.find(function(err, data) {
           if (err) {
               res.send(500, {message: 'No entry present within the database'});
           }
            res.json(data);
        });
        // dashboard.find(function(err, data) {
        //     if (err) {
        //         res.send(500, {message: 'no entry present within the database'});
        //     }
        //     res.json(data);
        // });
    });
router.route('/bugs')
    .put(function(req, res) {
        console.log('inside dashboard bugs api');
        var newBugs = new bugs();
        newBugs.reportId = req.body.reportId;
        newBugs.createBy = req.body.classId;
        newBugs.methodName = req.body.methodName;
        newBugs.sourceLine.start = req.body.start;
        newBugs.sourceLine.end = req.body.end;
        newBugs.category = req.body.category;
        newBugs.priority = req.body.priority;
        newBugs.SM = req.body.SM;
        newBugs.LM = req.body.LM;
        // newPost.createdAt = req.body.createdAt;
        newBugs.save(function(err, postData) {
            if (err) {
                res.send(500, {message: 'unable to insert within the database'});
            }
            if (!postData) {
                res.send(500, 'data not present');
            }
            res.json(postData);
        });
        // console.log(res);
    });

module.exports = router;