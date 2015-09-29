var ejs = require('ejs');
var fs = require('fs');
var template = fs.readFileSync(__dirname + '/template.ejs', 'utf8');
var pouch = require('pouchdb');
var db = new pouch('http://localhost:5984/irclog');

var primitives = {
	list: function (req, res, next) {
		var list;
		db.allDocs()
			.then(function (list) {
				list = list;
				res.send(list);
			});
	}
};

var index = function (req, res, next) {
    var list;
    var options = {
        limit: 20,
        include_docs: true
    };
    if (req.params.page) {
        options.offset = req.params.page * options.limit;
    }
    var allDocs = db.allDocs(options)
    .then(function(resp) {
        list = resp.rows;
        var ret = ejs.render(template, {
            messages: list
        });
        res.send(ret);
    }).catch(function (error) {
      res.send('error')
    });
}


module.exports = {
	list: primitives.list,
    index: index
};
