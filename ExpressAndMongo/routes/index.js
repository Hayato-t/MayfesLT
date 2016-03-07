
/*
 * GET home page.
 */
var db = require('./db');
var async = require('async');
var model = require('./model');
var User = model.User;
exports.index = function (req, res) {
    res.render('index');
};

exports.check = function (req, res) {
    db.findAll(req, res, function (rel) {
        console.log(rel);
        res.render('check', { data: rel });
    });
};

exports.send = function (req, res) {
    res.render('send');
}
exports.conf = function (req, res) {
    var data;
    async.series([
        function (callback) {
            db.addRecords(req, res, function (record) {
                data = record;
            }
            );
            callback();
        },
        function (callback) {
            res.render('conf', { data: data });
        }
    ]);
    
};
exports.search = function (req, res) {
    res.render('search');
};

// ユーザー登録機能
exports.add = function (req, res) {  // add は postで行われる。
    var newUser = new User(req.body); // postの内容{email: "fuga@fuga", password: "fugafuga"}を利用して、新しいドキュメントを作成
    newUser.save(function (err) {       // 追加する
        if (err) {
            console.log(err);
            // ★★model.jsの方で email に対し unique option をつけたので、同じemailを指定するとエラー11000が返ってくる
            if (err.code === 11000) console.log("the username is already used");
            res.redirect('back');
        } else {
            console.log("add success and redirect to '/'");
            req.session.user = req.body.username;  // ★★ここでsessionに記録して、ログインする
            res.redirect('/');  // 新しいアカウントが作られたので、次のloginCheckは成功する
        }
    });
};

/*ログイン機能*/
exports.login = function (req, res) {
    console.log("aaaaaaa");
    var username = req.query.username;
    var password = req.query.password;
    var query = { "username": username, "password": password };
 //   User.find(query, function (err, data) {
        console.log("aaaaaaa");

//        if (err) {
//            console.log(err);
 //       }
//        if (data == "") {
//            res.render('login');
//        } else {
//            req.session.user = username;
            res.redirect('index');
//        }
//    });
};