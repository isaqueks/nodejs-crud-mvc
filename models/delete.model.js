const Model = require('../src/model');
const ModelData = require('../src/modelData');
const CookieParser = require('../src/cookieParser');
const SessionManager = require('../src/sessionManager');
const UserCrud = require('../src/userCrud');

class DeleteModel extends Model {

    async Get(req) {
        let data = new ModelData();

        const cookies = CookieParser.getCookies(req);
        const user = await SessionManager.getLoggedUser(cookies);

        data.setData({ user });

        if (!user.loggedIn) { // Not anonymous
            return data.addData({
                error: 'You are not logged-in! <a href="login">Log-in</a> first!',
            });
        }

        return data;
    }

    async Post(req) {
        let data = new ModelData();
        const cookies = CookieParser.getCookies(req);
        const user = await SessionManager.getLoggedUser(cookies);

        data.setData({ user });

        if (!user.loggedIn) { // Not anonymous
            return data.addData({
                error: 'You are not logged-in! <a href="login">Log-in</a> first!',
            });
        }

        if (req.body.confirm != 'yes') return;

        try {
            await UserCrud.delete(user);
            return SessionManager.logOut(data).redirect('/');
        }
        catch (e) {
            let errorMessage = e;
            if (typeof errorMessage == 'object')
                errorMessage = errorMessage.toString();
            return data.addData({ error: errorMessage });
        }
    }

}

module.exports = DeleteModel;