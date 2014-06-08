// models.js
var Sequelize = require('sequelize');
var fs = require('fs');
var settingsFile = fs.readFileSync(__dirname + '/settings.json', 'utf8');
var settings = JSON.parse(settingsFile);

var sequelize = new Sequelize(
    settings.database.name, 
    settings.database.user, 
    settings.database.pass, {
	dialect: 'postgres',
	port: 5432,
	logging: false
});

var message = sequelize.define('Message',{
    timestamp: Sequelize.DATE,
    text: Sequelize.STRING,
    sentfrom: Sequelize.STRING,
    sentto: Sequelize.STRING
});

// write your own models here
module.exports = {
    message: message,
	db: sequelize
};