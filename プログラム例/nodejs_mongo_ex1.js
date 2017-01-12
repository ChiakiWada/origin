var mongo = require('mongodb'),
    fs = require('fs');

  mongo.Db.connect( "mongodb://localhost/test", function (err, db) {
    db.collection( "table", function(err, collection) {
      async.forEachSeries( fs.readFileSync('test.txt').toString().split('\n'), function (line, cb) {
      var json ={};
      json['value'] = line.trim();
      json['hoge'] = 'hoge';

        collection.insert( json, {safe:true}, function(err, result) {
          console.log( "insert:" + line);
          cb(err);
        });
      },
        function(){db.close();
      });
    });
  });
  
