/*
  mongoDB基本機能モジュール
  モジュールを呼び出して変数に格納すると、DBのコレクションが入る
  var col = require('this_module.js');

  書き込み方法
  col.write({json data});

  読み込み方法
  col.read();
*/

(function(){
  var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888;

  http.createServer(function(request, response) {
      var Response = {
          "200":function(file, filename){
              var extname = path.extname(filename);
              var header = {
                  "Access-Control-Allow-Origin":"*",
                  "Pragma": "no-cache",
                  "Cache-Control" : "no-cache"
              }
              response.writeHead(200, header);
              response.write(file, "binary");
              response.end();
          },
          "404":function(){
              response.writeHead(404, {"Content-Type": "text/plain"});
              response.write("404 Not Found\n");
              response.end();
          },
          "500":function(err){
              response.writeHead(500, {"Content-Type": "text/plain"});
              response.write(err + "\n");
              response.end();
          }
      }

      var uri = url.parse(request.url).pathname
      , filename = path.join(process.cwd(), uri);
      fs.exists(filename, function(exists){
          console.log(filename+" "+exists);
          if (!exists) { Response["404"](); return ; }
          if (fs.statSync(filename).isDirectory()) { filename += './kashika_search0106.html'; }
          fs.readFile(filename, "binary", function(err, file){
          if (err) { Response["500"](err); return ; }
              Response["200"](file, filename);
          });
      });

  }).listen(parseInt(port, 10));
  console.log("Server running at http://localhost:" + port );

  var express = require('express');
  var mongodb;    // mongoDBモジュール
  var server;     // mongoDBサーバ
  var db;         // データベース
  var collection; // コレクション
  var databaseName = 'sample';     // データベース名
  var collectionName = 'foo'; // コレクション名
  var read;       // 読み込みメソッド

  // mongoDBモジュールの取得
  try{
    // mongoDBモジュールがインストールされているか確認してから呼び出す。
    require.resolve('mongodb');
    mongodb = require('mongodb');
    }
    catch(err){
    console.log('ERROR:mongoDBモジュールが見つかりません');
  }

  // データベースに接続
  // デフォルトポートの取得は mongodb.Connection.DEFAULT_PORT
  server = new mongodb.Server('localhost', 27017);
  console.log('サーバー接続');
  // ドライバーでエラー情報を受け取るためにsafe:trueにする
  db = new mongodb.Db(databaseName, server, {safe:true});
  db.open(function(err, db){
    if(err){
     console.error('DB接続エラー');
     throw(err);
    }
    console.log('DB接続完了');

    // 接続完了後にコレクション取得 ///////////////////////
    collection = db.collection(collectionName);

    // console.log('コレクション取得');
    // var cursor = collection.find({"g1":"1"});
    // cursor.count(function(err, cnt){
    //   console.log('件数：', cnt);
    // });
    // cursor.toArray(function(err, documents) {
    //   console.log(documents);
    // });

    // 読み込み用メソッド
    read = function(){
      console.log('read関数');
      var cursor = collection.find({"g1":"1"});
      cursor.count(function(err, cnt){
        console.log('件数：', cnt);
      });
      cursor.toArray(function(err, documents) {
        console.log(documents);
      });

    }

    module.exports ={
      // write:write,
      read:read
    }

  });
}());
console.log('初期関数終了');
