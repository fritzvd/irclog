var views = require('./views');

function setup(app) {
  app.get('/:page', views.index);
	app.get('/', views.index);
}
 
exports.setup = setup;
