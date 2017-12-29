/*
    后台管理路由首页
 */

var express = require('express');
var router = express.Router();
var util = require('util');
var formidable = require('formidable');

var articleRouter = require('./article');
var articleTypeRouter = require('./articleType');
var userModel = require('../../model/user/users');


var article = require('./article');
var articleType = require('./articleType');

router.use('/', function (req, res, next) {
    //权限控制
    if(!req.session.userInfo) {
        res.redirect('/login');
    }

    userModel.isAdmin(req.session.userInfo.name, function (err, result) {
        if(err) {
            console.log(err);
            return;
        }
        if(result) {
            next();
        } else {
            res.redirect('/');
        }
    });
});

router.get('/', function (req, res, next) {
    res.render('admin/index', {});
});

router.use(article);

router.use(articleType);

module.exports = router;
