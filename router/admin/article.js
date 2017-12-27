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
            res.send('资料未填写完整！');
        } else if(err) {
            console.log(err);
            return;
        }
        res.redirect('/admin/articleList');
    });
});

router.get('/delArticle', function (res, req, next) {
    //拿到需要删除的文章ID
});

router.get('/editArticle', function (req, res, next) {
    var aid = parseInt(req.params._id);
    articleModel.updateArticle({_id:aid}, function () {
        
    });
});

module.exports = router;
