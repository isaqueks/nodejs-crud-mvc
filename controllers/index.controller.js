const Controller = require('../src/controller');
const IndexModel = require('../models/index.model');

module.exports = new Controller('index', new IndexModel());