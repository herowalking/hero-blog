var formidable = require('formidable');
var crypto = require('crypto');

var Users = require('../../schema/user/User');

module.exports = {
    register: function (fields, callback) {
        if(fields.username !== '' & fields.password !== '') {
            fields.registerTime = fields.updateTime = new Date();
            fields.rank = 1;
            var md5 = crypto.createHash('md5');
            fields.password = md5.update(fields.password).digest('base64');

            console.log('formidable...');
            console.log(fields);
            Users.create(fields, function (err) {
                callback(err);
            });
        } else {
            callback('-1');
        }
    },
    userFind: function (req, callback) {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if(fields.username !== '' && fields.password !== '') {
                Users.find({username: fields.username}, function (err, result) {
                    callback(err, result, fields);
                });
            } else {
                callback('-1');
            }
        });
    },
    queryUserInfo: function (req, callback) {
        if(req.body.username === '' || req.body.password === '') {
            callback(0); //0表示用户名和密码有一个没有填写
            return;
        }

        Users.findOne({username: req.body.username}, function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            console.log('--------');
            console.log(req.body);
            var md5 = crypto.createHash('md5');
            var password = md5.update(req.body.password).digest('base64');
            console.log(result);
            if(result === null) {
                callback(1); //没有注册
            } else if (result.username === req.body.username && result.password === password) {
                req.session.userInfo = {name: result.username, sign: true};
                if(result.rank > 10) {
                    callback('admin');
                } else {
                    callback('member');
                }
            } else {
                callback(2);
            }
         });
    },

    isAdmin: function (username, callback) {
        User.findOne({username: username}, function (err, result) {
            console.log(result);
            console.log('...');
            if(result.rank > 10) {
                callback(err, true);
            } else {
                callback(err, false);
            }
        })
    }
}