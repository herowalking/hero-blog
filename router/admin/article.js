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
    var articleId = req.query._id;
    articleModel.delArticle({_id:articleId}, function (err) {
        if(err) {
            console.log(err);
            return;
        }
        res.send('删除成功！');
    });
});

router.get('/editArticle', function (req, res, next) {
    var articleId = parseInt(req.params._id);
    articleModel.updateArticle({_id:articleId}, function (err, art) {
        console.log("articleModel loading...");
        console.log(art);
        res.render('admin/updateArticle', art);
    });
});

router.post('/editArticle', function (req, res, next) {
    articleModel.editForm(req, function (err) {
        if(err) {
            console.log(err);
            return;
        }
        res.send('修改成功！');
    });
});

module.exports = router;
