var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
//
// var postSchema = new mongoose.Schema({
//     text: String,
//     createBy: String,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
//
// });
var postSchema = new mongoose.Schema({
    text: String,
    createBy: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
mongoose.model("User", userSchema);
mongoose.model("Posts", postSchema);
