var views = require('./views');

function setup(app) {
    app.get('/api/:table', views.list);
    app.get('/:page', views.index);
	app.get('/', views.index);
}
 
exports.setup = setup;