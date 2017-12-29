var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

var db = require('./config/db.js');

//后台模块
app.use('/admin', require('./router/admin'));

//会员模块
app.get('/member', function (req, res) {
    res.send('Hello member!');
});

app.listen(3000);