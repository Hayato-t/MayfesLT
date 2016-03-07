"use strict";
var async = require('async');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
// Default Schemaを取得
var Schema = mongoose.Schema;

// Defaultのスキーマから新しいスキーマを定義
var RequestTable = new Schema( {
    name: String
    , mode: String
    , date: Date
    , state: String
    , 1 : Number
    , 2 : Number
    , 3 : Number
    , 4 : Number
    , 5 : Number
    , 6 : Number
    , 7 : Number
    , 8 : Number
    , 9 : Number
    , 10 : Number
    , 11 : Number
    , record: Date
});

// ドキュメント保存時にフックして処理したいこと
RequestTable.pre('save', function (next) {
    this.date = new Date();
    next();
});

// モデル化。model('[登録名]', '定義したスキーマクラス')
//mongoose.model('Record', RequestTable);

var Rec;

// mongodb://[hostname]/[dbname]
var connection = mongoose.createConnection('mongodb://localhost/Record');
autoIncrement.initialize(connection);

// mongoDB接続時のエラーハンドリング
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
    console.log("Connected to 'Record' database");
    // RecordでautoIncrementを使用することを定義
    RequestTable.plugin(autoIncrement.plugin, 'Record');
    // 定義したときの登録名で呼び出し
    Rec = connection.model('Record',RequestTable);
});

exports.findAll = function (req, res,callback) {
    console.log('Getting AllRecords');    
    Rec.find({}, function (err, results) {
        if (err) {
            res.send({ 'error': 'An error has occurred' });
        } else {
            console.log('Success: Getting Records' + results.length);
            callback(results);
        }
    });
};

exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving Record: ' + id);
    
    Rec.find({_id : id}, function (err, result) {
        if (err) {
            res.send({ 'error': 'An error has occurred' });
        } else {
            console.log('Success: ' + JSON.stringify(result));
            res.json(result);
        }
    });
};

exports.addRecords = function (req, res, callback) {
    var record = req.body;
    console.log('Adding record: ' + JSON.stringify(record));
    delete record.__proto__;
    record.date = new Date();
    record.state = "Waiting";
    var addrec = new Rec(record);
    addrec.save(function (err, result) {
        if (err) {
            res.send({ 'error': 'An error has occurred' });
        } else {
            console.log('Success: ' + JSON.stringify(result));
            res.json(result);
        }
    });
    callback(JSON.stringify(record));
};

exports.updateRecords = function (req, res) {
    var id = req.params.id;
    console.log('Updating record: ' + id);
    
    var record = req.body;
    delete record._id;
    Rec.findByIdAndUpdate(id, record, function (err, result) {
        if (err) {
            res.send({ 'error': 'An error has occurred - ' + err });
        } else {
            console.log('Success: ' + result + ' document(s) updated');
            res.send(record);
        }
    });
};

exports.deleteRecords = function (req, res) {
    var id = req.params.id;
    console.log('Deleting record: ' + id);
    
    Rec.findByIdAndRemove(id, function (err, result) {
        if (err) {
            res.send({ 'error': 'An error has occurred - ' + err });
        } else {
            console.log('Success: ' + result + ' document(s) deleted');
            res.send(req.body);
        }
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function () {
};