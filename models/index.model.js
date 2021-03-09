const Model = require('../src/model');
const ModelData = require('../src/modelData');
const CookieParser = require('../src/cookieParser');
const SessionManager = require('../src/sessionManager');

class IndexModel extends Model {

    async Get(req) {
        let data = new ModelData();

        const cookies = CookieParser.getCookies(req);
        const user = await SessionManager.getLoggedUser(cookies);

        return data.setData({ user });
    }

    async Post(req) {

        return new ModelData()
        .redirect('/');

    }

}

module.exports = IndexModel;