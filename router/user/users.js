var express = require('express');
var router = express.Router();
var util = require('util');

var userModel = require('../../model/user/users');

router.get('/register', function (req, res, next) {
    res.render('users/register');
});

router.post('/register', function (req, res, next) {
    console.log('Register loading...');
    userModel.userFind(req, function (err, result, fields) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('长度: ' + result.length);
        if(result.length === 0) {
            userModel.register(fields, function (err) {
                if(err) {
                    console.log(err);
                    return;
                }
                res.send('注册成功！');
            });
        } else {
            res.send('用户名已经注册，请重新注册！');
        }
    });
});

//登录
router.get('/login', function (req, res, next) {
    res.render('user/login');
});

//处理用户登录
router.post('/login', function (req, res, next) {
    console.log('login...');
    userModel.queryUserInfo(req, function (findInfo) {
        console.log('login2...');
        console.log(findInfo);
        console.log('==========');
        if(findInfo === 0) {
            res.send('请输入用户名和密码！');
        } else if(findInfo === 1) {
            res.send('1');
        } else if(findInfo === 'admin') {
            res.redirect('/admin');
        } else if(findInfo === 'member') {
            res.redirect('/');
        } else if(findInfo === 2) {
            res.send('用户名或密码错误！');
        }
    });
});

module.exports =  router;