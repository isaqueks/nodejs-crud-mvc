const Controller = require('../src/controller');
const LogoutModel = require('../models/logout.model');

module.exports = new Controller(null, new LogoutModel());