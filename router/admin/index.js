/*
    后台管理路由首页
 */

var express = require('express');
var router = express.Router();


var article = require('./article');
var articleType = require('./articleType');

router.use('/', function (req, res, next) {
    /*
    //权限控制
    if(req.isAdmin){
        return;
    }*/
    next();
});

router.get('/', function (req, res, next) {
    res.render('admin/index', {});
});

router.use(article);

router.use(articleType);

module.exports = router;
