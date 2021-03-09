const Controller = require('../src/controller');
const RegisterModel = require('../models/register.model');

module.exports = new Controller('register', new RegisterModel());