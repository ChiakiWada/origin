var express = require('express');
var ECT = require('ect');
var MongoClient = require('mongodb').MongoClient;
var moment = require('moment'); //現在時刻を文字列で取得

var app = express();
var ectRenderer = ECT({watch: true, root: __dirname + '/views', ext: 'index.ect'});

var dbUrl = 'mongodb://localhost:27017/sample';

app.engine('ect', ectRenderer.render);
app.set('view engine', 'ect');
app.use(express.static('public'));

app.get('/', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        console.log('サーバー・データベース接続');
        if (err) {
            throw err;
        }

        var testCollection = db.collection('foo');
        console.log('コレクション接続');

        testCollection.find({}).toArray(function (err, docs) {
            db.close();
            console.log('データベースclose');
            res.render('index', {docs: docs}); //この例の場合index.ectファイルとして解釈される
        });
    });
});
app.listen(3000);


var app2 = express();

var ectRenderer2 = ECT({watch: true, root: __dirname + '/views', ext: 'index2.ect'});
app2.engine('ect', ectRenderer2.render);
app2.set('view engine', 'ect');
app2.use(express.static('public'));

app2.get('/', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        console.log('サーバー・データベース接続');
        if (err) {
            throw err;
        }

        var testCollection = db.collection('foo');
        console.log('コレクション接続');

        testCollection.find({}).toArray(function (err, docs) {
            db.close();
            console.log('データベースclose');
            res.render('index2', {docs: docs}); //この例の場合index.ectファイルとして解釈される
        });
    });
});
app2.listen(4000);
