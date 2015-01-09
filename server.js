var MongoClient = require('mongodb').MongoClient;
var express = require('express')
    app = express();
var port = 8080;

app.get('/',function(req,res){
	res.send("hello world");
});
app.get('*',function(req,res){
res.status(404).send("Page not found :(");
})
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
app.listen(port);
console.log("Started on port "+port)
