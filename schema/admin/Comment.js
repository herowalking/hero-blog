var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    author: String,
    articla: String,
    createTime: Date,
    content: String
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;