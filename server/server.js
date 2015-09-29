var routes = require('./urls');
var express = require('express');

var app = express();
app.set('view engine', 'ejs');
app.configure(function () {
	app.use(express.bodyParser());
	app.use('/assets', express.static(__dirname + '/../assets'));
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
		port = 5001
	}
	routes.setup(app);
	app.listen(port);
	return app;
};

module.exports = {
	start: start
};
