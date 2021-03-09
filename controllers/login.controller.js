const Controller = require('../src/controller');
const LoginModel = require('../models/login.model');

module.exports = new Controller('login', new LoginModel());