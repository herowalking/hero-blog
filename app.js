var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('./public'));

var db = require('./config/db.js');

var session = require('express-session');

app.use(session({
    secret: 'this is herowalking',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60*30*1000}
}));

//后台模块
app.use('/admin', require('./router/admin'));

app.use(require('./router/user/users'));

//会员模块
app.get('/member', function (req, res) {
    res.send('Hello member!');
});

app.use(require('./router/frontend/index'));

app.listen(3000);