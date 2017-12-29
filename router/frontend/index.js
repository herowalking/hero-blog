var express = require('express');

var router = express.Router();

var articleModel = require('../../model/frontend/articleModel');
var articleTypeModel = require('../../model/admin/articleType');

//文章列表
router.get('/', function (req, res, next) {
    articleModel.findList(req.query, function (err, result) {
        res.render('frontend/index', {article: result});
    })
});

router.get('/detail', function (req, res, next) {
    var articleId = req.query._id;

    articleModel.articleDetail({_id: articleId}, function (err, result) {
        if(err) {
            console.log(err);
            return;
        }
        var currUser = req.session.userInfo? req.session.userInfo.name:'未登录';
        res.render('frontend/article', {article: result, username: currUser});
    });
});

router.post('/addComment', function (req, res, next) {
    articleModel.addComment(req, function () {
        articleModel.findComment({article: req.body._id}, function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            res.json(result);
        });
    });
});

router.get('/commentList', function (req, res, next) {
    articleModel.findComment({article: req.body._id}, function (err, result) {
        if(err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
});

module.exports = router;