var express = require('express'),
	app = express(),
	exphbs  = require('express-handlebars'),
	bodyParser = require('body-parser'),
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;
	
var port = 8080;
var mongoclient = new MongoClient(new Server('localhost', 27017, {'native_parser': true}));
var db = mongoclient.db('mongoBlog');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', "views");

app.get('/:collection', function (req, res) {
	var query = req.query || {};
	db.collection(req.params.collection).find(query, function (err, doc) {
		if (err)
			throw err;
		res.render("hellos", doc);
	});
});

app.post('/:collection', function (req, res,next) {
	var collection = req.params.collection;
	var payload = req.body;
	console.log("collection " + collection);
	console.log("Added Doc " + payload);
	db.collection(collection).insert(payload, function (err, doc) {
		if (err)
			throw err;
		console.log("Added Doc" + doc._id);
		res.end();
	});
});

app.get('*', function (req, res) {
	res.status(404).send("Page not found :(");
});

mongoclient.open(function (err, db) {
	if (err)
		throw err;
	app.listen(port);
	console.log("Started on port " + port);
});

