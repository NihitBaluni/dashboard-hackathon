var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

// var bugsInstanceSchema = new mongoose.Schema({
//     Id:{type:Number,  default: 0, unique:true},
//     Name: String,
//     createBy: String,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

var bugsInstanceSchema = new mongoose.Schema({
    Id:{type:Number,  default: 0, unique:true},
    reportId: String,
    classId: String,
    methodName: String,
    sourceLine: {
        start: Number,
        end: Number
    },
    category: String,
    priority: String,
    SM: String,
    LM: String
});
bugsInstanceSchema.plugin(autoIncrement.plugin,
    {
        model:'bugsInstanceSchema',
        field: 'Id',
        startAt:1,
        incrementBy:1
    });
mongoose.model("Bugs", bugsInstanceSchema);
