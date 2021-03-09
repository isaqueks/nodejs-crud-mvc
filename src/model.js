
const ModelData = require('./modelData');

class Model {

    async Get(req) {
        return new ModelData();
    }

    async Post(req) {
        return new ModelData();
    }

}

module.exports = Model;