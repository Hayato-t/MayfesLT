"use strict";

var express = require('express')
var routes = require('./routes/index');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(express);
var app = express();

// app.js[f:id:AMANE:20140518175155p:plain][f:id:AMANE:20140518175155p:plain]
app.use(express.cookieParser());  // cookieのパースを行う。次に決めるsecretを使って行われる
app.use(express.session({
         // cookieに書き込むsessionの仕様を定める
    secret: 'secret',               // 符号化。改ざんを防ぐ
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        db: 'session',
        host: 'localhost',
        clear_interval: 60 * 60     // mongodbに登録されたsession一覧を見て、expireしている物を消す、ということをする周期。こちらはs
    }),
    cookie: {
 //cookieのデフォルト内容
        httpOnly: false,
        maxAge: 60 * 60 * 1000// ★★修正箇所：1 hour. ここを指定しないと、ブラウザデフォルト(ブラウザを終了したらクッキーが消滅する)になる こちらはms
    }
}));
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
app.use(express.favicon());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded());
// <input type="hidden" name="_method" value="put"> などのカスタムリクエストメソッドを定義できる
// 今回は未出。
app.use(express.methodOverride());

var loginCheck = function (req, res, next) {
    console.log("loginCheck" + new Date().toLocaleString());
    console.log("#### req.session ####");
    console.log(req.session);   // sessionミドルウェアを通してパースされたsessionオブジェクトを確認する
    console.log("#### req.cookies ####");
    console.log(req.cookies);   // 送られてきたcookieの実体を確認する    
    if (req.session.user) {
       next();
    } else {
        console.log("aaaaa");
        res.redirect('/login');
    }
};
app.use(app.router);
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    // NODE_ENVによる NODE_ENV=production node app で起動するとproductionになる
    console.log("env == development");
}

app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/add', routes.add);
app.get('/logout', function (req, res) {
    req.session.destroy();
    console.log('deleted sesstion');
    res.redirect('/');
});
app.get('/index', routes.index);
app.get('/check', routes.check);
app.get('/send', routes.send);
app.get('/search', routes.search);
app.post('/send', routes.conf);
http.createServer(app).listen(3000, function () {
    console.log('Express server listening on port ' + 3000);
  // app.get('port'); setできる項目については、getもできる。
});