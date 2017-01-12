var data = new Mongo().getDB("sample").getCollection("foo").find();
data.forEach (
    function(d) {
        if (d.yadonum >= 1) {
            print(d.yadonum + ',' + d.yadonum);
        }

        if (d.yadonum >= 90) {
            print('***' + d.yadonum + ',' + d.yadonum);
        }
    }
);
