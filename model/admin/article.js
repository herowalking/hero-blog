var formidable = require('formidable');

var Article = require('../../schema/admin/Article');
var artTypeModel = require('./articleType');

module.exports = {
    findeArticle: function (params, callback) {
        Article.find(params || {}).populate("type").exec(function (err, art) {
            callback(err, art);
        });
    },

    addArticle: function () {
        
    },

    addForm: function (req, callback) {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if(fields.title !== '' && fields.author !== '' && fields.type !== '' && fields.read !== '' && fields.tag !== '' && fields.content !== '') {
                fields.updateTime = fields.createTime = new Date();

                Article.create(fields, function (err) {
                    callback(err);
                });
            } else {
                callback('-1');
            }
        });
    },

    updateArticle: function (params, callback) {
        Article.findOne(params || {}, function (err, art) {
            if(err) {
                console.log(err);
                return;
            }
            artTypeModel.findType({}, function (err, result) {
                if(err) {
                    console.log(err);
                    return;
                }
                callback(err, {article:art, articleType: result});
            });
        });
    },

    delArticle: function (params, callback) {
        Article.remove(params, function(err){
            callback(err);
        })
    },
    
    editForm: function (req, callback) {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if(fields.title !== '' && fields.author !== '' && fields.type !== '' && fields.read !== '' && fields.tag !== '' && fields.content !== '') {
                fields.updateTime = new Date();

                Article.update(fields, function (err) {
                    callback(err);
                });
            } else {
                callback('-1');
            }
        });
    }
}