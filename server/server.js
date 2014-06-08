var express = require('express');
var models = require('./models');
var routes = require('./urls');

var app = express();
app.set('view engine', 'ejs');
app.configure(function () {
	app.use(express.bodyParser());
	app.use('/', express.static(__dirname + '/../client'));
	app.all('*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});
	app.use(app.router);
});

function start(port) {
	if (port == undefined) {
		port = 5000
	}
	routes.setup(app);
	app.listen(port);
	return app;
};

module.exports = {
	start: start
};