var db = require('../db');
var Sequelize = require('sequelize');

var PhoneScreen = db.define('PhoneScreens', {
  application_id: Sequelize.INTEGER,
  interviewer: Sequelize.STRING,
  date_time: Sequelize.DATE,
  status:Sequelize.STRING,
  notes: Sequelize.TEXT
});

module.exports = PhoneScreen;