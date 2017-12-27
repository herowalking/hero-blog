var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hero-blog');

var db = mongoose.connection;

db.once('open', function(){
    console.log('MongoDB is connected.');
});

module.exports = db;