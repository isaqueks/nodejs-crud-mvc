const Controller = require('../src/controller');
const DeleteModel = require('../models/delete.model');

module.exports = new Controller('delete', new DeleteModel());