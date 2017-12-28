var formidable = require('formidable');

var Users = require('../../schema/user/User');

module.exports = {
    register: function (fields, callback) {
        if(fields.username !== '' & fields.password !== '') {
            fields.registerTime = fields.updateTime = new Date();
            fields.rank = 1;
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
    }
}