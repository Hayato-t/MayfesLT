﻿var mongoose = require('mongoose');
var url = 'mongodb://localhost/user';
var db = mongoose.createConnection(url, function (err, res) {
    if (err) {
        console.log('Error connected: ' + url + ' - ' + err);
    } else {
        console.log('Success connected: ' + url);
    }
});

// Modelの定義
var UserSchema = new mongoose.Schema({
    username    : { type: String, unique: true }, // ★★ emailキーはunique
    password  : String
}, { collection: 'info' });  // collection名を指定する;

exports.User = db.model('User', UserSchema);