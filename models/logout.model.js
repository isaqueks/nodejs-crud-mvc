const Model = require('../src/model');
const ModelData = require('../src/modelData');
const CookieParser = require('../src/cookieParser');
const SessionManager = require('../src/sessionManager');

class LogoutModel extends Model {

    async Get(req) {
        let data = new ModelData();
        return SessionManager.logOut(data).redirect('/');
    }

    async Post(req) {
        return await this.Get(req); // Same thing
    }

}

module.exports = LogoutModel;