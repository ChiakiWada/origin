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
var mongodb;    // mongoDBモジュール
var server;     // mongoDBサーバ
var db;         // データベース
var collection, // コレクション
var databaseName = 'sample';     // データベース名
var collectionName = 'foo'; // コレクション名

var write;      // 書き込みメソッド
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
// ドライバーでエラー情報を受け取るためにsafe:trueにする
db = new mongodb.Db(databaseName, server, {safe:true});
db.open(function(err, db){
 if(err){
   console.error('DB接続エラー');
   throw(err);
 }
 console.log('DB接続完了');

 // 接続完了後にコレクション取得
 collection = db.collection(collectionName);
});

// 書き込み用メソッド
write = function(json){
 collection.insert(
   json,
   // 書き込み処理後のコールバック関数（省略可）
   function(err, data){
     if(err){
       console.error('書き込み時にエラーが発生しました');
       throw(err);
     }
     console.log('データ書き込み完了:',data);
 });
}

// 読み込み用メソッド
read = function(){
 var cursor = collection.find();
 cursor.toArray(function(err, docs){
   // toArray用のコールバック関数
   if(err){
     console.error('読み込みエラー');
     throw(err);
   }
   console.log(docs);
 });
}

module.exports ={
 write:write,
 read:read
}
}());
