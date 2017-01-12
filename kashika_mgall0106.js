/**/
//var database;
//ページを読み込んだあと最初に実行される関数をinitに設定
onload = init;
//onunload = dbClose;

function init() {
  document.getElementById("keywords").onblur = function (){blur(this);}
  document.getElementById("keywords").onfocus = function (){focus(this);}
  document.getElementById("btn_insert").onclick = function (){insert();}

  //dbConnect();
  //dataDisp();
}

//入力フォームに入った時の色
function focus(obj){
  obj.style.backgroundColor = "#90ee90";
}
//入力フォームから出た時の色
function blur(obj){
  obj.style.backgroundColor = "#ffffff";
}

//データベースに接続
function dbConnect() {
  database = new ActiveXObject("ADODB.Connection");
  database.Open("Driver={Microsoft Access Driver (*.mdb)};DBQ=c:\\SampleDB010.mdb;");
  alert("データベースに接続しました。");
}

//データベースを切断
function dbClose() {
  database.Close();
  database = null;
  alert("データベースを切断しました。");
}

//データ表示
function dataDisp() {

    //SQL文代入
    var mySql = "select * from T01Prefecture order by PREF_CD";
    //変数を関数に渡す，戻り値でテーブルが返ってくる
    var recordSet = database.Execute(mySql);

    //データベースから取り出したデータを一時的に保存しておくための変数
    var tempHtml="";
    //htmlに書いた<div id="disp">ここにデータを表示</div>内のhtmlを空にします。「ここにデータを表示」という文字が消えます。
    document.getElementById("disp").innerHTML = "";
    //whileは条件式が満たされる間、処理が繰り返されます。この場合recordSetがEnd Of File（終端）に達するまで繰り返し。
    while (!recordSet.EOF){
      //あらかじめ用意しておいたtempHtmlにレコードからデータを取り出し、文字列として結合(どんどんコードを繋げている)
      tempHtml = tempHtml + recordSet(0) + ":" + recordSet(1) + "<br />";
      //次のレコードに進めています
      recordSet.MoveNext();
    }
    //htmlに書いた<div id="disp"></div>内のhtmlにtempHtmlの値を代入
    document.getElementById("disp").innerHTML = tempHtml;
    //使い終わったレコードセットを閉じて後始末しています
    recordSet.Close();
    recordSet = null;
}

//データ追加
function insert() {
  with (document.form1) {
    var k_t = "～キーワード「" + keywords.value + "」の検索結果～";
    var k_k = "<table border=\"2\" width=\"60%\" height=\"50%\" cellspacing=\"5\" cellpadding=\"2\"> <tr align=\"center\" bgcolor=\"#ffe4c4\">";
    k_k = k_k + "<td width=\"60%\"> <a href=\"http://travel.rakuten.co.jp/HOTEL/147158/147158_std.html\" target=\"_blank\">ＯＯホテル</a> </td>";
    k_k = k_k + "<td width=\"20%\"><div class=\"site-logoM\"><div class=\"site-info\"> <a href=\"http://travel.rakuten.co.jp/HOTEL/147158/147158_std.html\" target=\"_blank\">風呂</a><p>40</p> </div></div></td>";
    k_k = k_k + "<td width=\"20%\"><div class=\"site-logoG\"><div class=\"site-info\"> <a href=\"http://travel.rakuten.co.jp/HOTEL/147158/147158_std.html\" target=\"_blank\">立地</a><p>20</p> </div></div></td></tr></table><br />";

    k_k = k_k + "<table border=\"2\" width=\"60%\" height=\"50%\" cellspacing=\"5\" cellpadding=\"2\"> <tr align=\"center\" bgcolor=\"#ffe4c4\">";
    k_k = k_k + "<td width=\"60%\"> <a href=\"http://travel.rakuten.co.jp/HOTEL/147158/147158_std.html\" target=\"_blank\">ＯＯホテル</a> </td>";
    k_k = k_k + "<td width=\"20%\"><div class=\"site-logoM\"><div class=\"site-info\"> <a href=\"http://travel.rakuten.co.jp/HOTEL/147158/147158_std.html\" target=\"_blank\">部屋</a><p>4</p> </div></div></td>";
    k_k = k_k + "<td width=\"20%\"><div class=\"site-logoG\"><div class=\"site-info\"> <a href=\"http://travel.rakuten.co.jp/HOTEL/147158/147158_std.html\" target=\"_blank\">食事</a><p>2</p> </div></div></td></tr></table><br />";
  }
  document.getElementById("key_title").innerHTML = "";
  document.getElementById("key_title").innerHTML = k_t;
  document.getElementById("kekka_ichiran").innerHTML = "";
  document.getElementById("kekka_ichiran").innerHTML = k_k;
/*
  alert(mySql);
  database.Execute(mySql);
  dataDisp();
  alert("追加しました。");
*/
}
