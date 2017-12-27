var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleTypeSchema = new Schema({
    typeName: String
});

var ArticleType = mongoose.model('ArticleType', articleTypeSchema);

module.exports = ArticleType;