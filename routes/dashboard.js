var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bugs = mongoose.model('Bugs');
var xmlToJs = require('xml2js');
var fs = require('fs');

router.route('/bugs')
    .get(function(req, res) {
        console.log('inside dashboard bugs api');
        bugs.find(function(err, data) {
           if (err) {
               res.send(500, {message: 'No entry present within the database'});
           }
            res.json(data);
        });
    });
router.route('/bugs')
    .put(function(req, res) {
        console.log('inside dashboard bugs api');
        parseXml(function(result) {
            // console.log(res);
            var bugsInstances = result.BugCollection.BugInstance;
            var bugInstance = 0;
            var bugInstance = 0;
            for (var bugInstance in bugsInstances) {
                var newBugs = new bugs();
                var classDetails = bugsInstances[bugInstance].Class[0];
                if (classDetails.$.primary == 'true') {
                    newBugs.className = classDetails.$.classname;
                } else {
                    continue;
                }
                newBugs.sourceLine.start = classDetails.SourceLine[0].$.start;
                newBugs.sourceLine.end = classDetails.SourceLine[0].$.end;
                newBugs.reportId = "repo-" + bugsInstances[bugInstance].$.type;
                newBugs.category = bugsInstances[bugInstance].$.category;
                newBugs.priority = bugsInstances[bugInstance].$.priority;
                newBugs.ShortMessage = bugsInstances[bugInstance].ShortMessage;
                newBugs.LongMessage = bugsInstances[bugInstance].LongMessage;
                if (bugsInstances[bugInstance].Method) {
                    newBugs.methodName = bugsInstances[bugInstance].Method[0].$.name;
                }
                newBugs.save(function(err, postData) {
                    if (err) {
                        res.send(500, {message: 'unable to insert within the database'});
                    }
                    if (!postData) {
                        res.send(500, 'data not present');
                    }
                });
            }

            res.send(200, 'data inserted successfully');
        });
        // console.log(parsedResult.BugCollection.BugInstance);
        // var newBugs = new bugs();
        // newBugs.reportId = req.body.reportId;
        // newBugs.createBy = req.body.classId;
        // newBugs.methodName = req.body.methodName;
        // newBugs.sourceLine.start = req.body.start;
        // newBugs.sourceLine.end = req.body.end;
        // newBugs.category = req.body.category;
        // newBugs.priority = req.body.priority;
        // newBugs.SM = req.body.SM;
        // newBugs.LM = req.body.LM;
        // // newPost.createdAt = req.body.createdAt;
        // newBugs.save(function(err, postData) {
        //     if (err) {
        //         res.send(500, {message: 'unable to insert within the database'});
        //     }
        //     if (!postData) {
        //         res.send(500, 'data not present');
        //     }
        //     res.json(postData);
        // });
        // console.log(res);
    });

function parseXml(response) {
    var xml = 'C:\\Users\\nihit_baluni\\PhpstormProjects\\MEAN-Test\\nihit\\new_hackathon\\dashboard-hackathon\\data\\findbugs.xml';
    var parser = new xmlToJs.Parser();
    fs.readFile(xml, function(err, data) {
        parser.parseString(data, function(err, result) {
            response(result);
        })
    });
}

module.exports = router;