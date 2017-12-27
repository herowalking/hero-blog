var ArticleType = require('../../schema/admin/ArticleType');

module.exports = {
    findType: function(params, callback) {
        ArticleType.find(params || {}, function (err, result) {
            callback(err, result);
        });
    }
}