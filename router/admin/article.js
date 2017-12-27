var express = require('express');
var router = express.Router();

var articleModel = require('../../model/admin/article');
var articleTypeModel = require('../../model/admin/articleType');

router.get('/articleList', function (req, res, next) {
    articleModel.findeArticle(req.query, function (err, result) {
        res.render('admin/articleList', {article:result});
    });
});

router.get('/addArticle', function (req, res, next) {
    articleTypeModel.findType({}, function (err, result) {
        res.render('admin/addArticle', {type:result});
    });
});

router.post('/addArticle', function (req, res, next) {
    articleModel.addForm(req, function (err) {
        if(err === '-1') {

        }
    })
})