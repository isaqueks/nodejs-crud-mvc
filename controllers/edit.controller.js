const Controller = require('../src/controller');
const EditModel = require('../models/edit.model');

module.exports = new Controller('edit', new EditModel());