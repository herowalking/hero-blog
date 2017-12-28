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

router.get('/login', function (req, res, next) {

});

module.exports =  router;