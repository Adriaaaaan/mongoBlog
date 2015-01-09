var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    db.collection('coll').findOne({}, function(err, doc) {
        if(err) throw err;
	if(doc===null) {
	 console.dir("Called addOne!");	
		db.collection('coll').insert({a:1,b:2}, function(err,doc){
			console.dir(doc);
                	db.close();
		});
	} else {
		 console.dir("Called findOne!");
        	console.dir(doc);
        	db.close();
	}	
    });

});

