var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var posts = mongoose.model('Posts');

router.use(function(req, res, next) {
    if (req.method === 'GET') {
        return next();
    }

    if (!req.isAuthenticated()) {
        res.redirect('/#login');
    }
    return next();
});

router.route('/posts')
    .get(function(req, res) {
        posts.find(function(err, data) {
            if (err) {
                res.send(500, {message: 'no entry present within the database'});
            }
            res.json(data);
        });
    })

    .post(function(req, res) {
        var newPost = new posts();
        newPost.text = req.body.text;
        newPost.createBy = req.body.createBy;
        // newPost.createdAt = req.body.createdAt;

        newPost.save(function(err, postData) {
            if (err) {
                res.send(500, {message: 'unable to insert within the database'});
            }
            if (!postData) {
                res.send(500, 'data not present');
            }
            res.json(postData   );
        });
    })

router.route('/posts/:id/')

    .get(function(req, res) {
        posts.findById(req.params.id, function(err, post) {
           if (err) {
               res.send(500, err);
           }
            res.json(post);
        });
    })

    .put(function(req, res) {
        posts.findById(req.params.id, function(err, post) {
            if (err) {
                res.send(500, err);
            }

            post.text = req.body.text;
            post.createBy = req.body.createBy;
            post.save(function(err, data) {
                if (err) {
                    res.send(500, err);
                }
                res.json(post);
            });
        });
    })

    .delete(function(req, res) {
        posts.findById(req.params.id, function(err, post) {
            if (err) {
                res.send(500, err);
            }
            posts.remove(function(err, post) {
                if (err) {
                    res.send(500, err);
                }
                res.json(post);
            });
        })
    });

module.exports = router;
