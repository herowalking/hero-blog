var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    attributes:[],
    author: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: "ArticleType"
    },
    read: Number,
    createTime: Date,
    content: String,
    support: Number,
    tag: [],
    updateTime: Date
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;