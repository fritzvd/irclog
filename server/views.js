var models = require('./models');
var ejs = require('ejs');
var fs = require('fs');
var template = fs.readFileSync(__dirname + '/template.ejs', 'utf8');

var primitives = {
	list: function (req, res, next) {
		var list;
		models[req.params.table].findAll()
			.success(function (list) {
				list = list;
				res.send(list);
			});
	}
};

var index = function (req, res, next) {
    var list;
    var options = {
        limit: 20,
        order: [['timestamp', 'DESC']]
    };
    if (req.params.page) {
        options.offset = req.params.page * options.limit;
    }
    models['message'].findAll(options)
    .success(function (list) {
        list = list;
        var ret = ejs.render(template, {
            messages: list
        });
        res.send(ret);
    });
}


module.exports = {
	list: primitives.list,
    index: index
};