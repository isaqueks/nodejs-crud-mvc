const Model = require('../src/model');
const ModelData = require('../src/modelData');
const CookieParser = require('../src/cookieParser');
const SessionManager = require('../src/sessionManager');
const UserCrud = require('../src/userCrud');

class LoginModel extends Model {

    async Get(req) {
        let data = new ModelData();

        const cookies = CookieParser.getCookies(req);
        const user = await SessionManager.getLoggedUser(cookies);
        if (user.loggedIn) { // Not anonymous
            return data.setData({
                error: 'You are already logged-in! <a href="logout">Log-out</a> first!'
            });
        }
        return data;
    }

    async Post(req) {
        let data = new ModelData();
        const cookies = CookieParser.getCookies(req);
        const user = await SessionManager.getLoggedUser(cookies);

        if (user.loggedIn) { // Not anonymous
            return data.setData({
                error: 'You are already logged-in! <a href="logout">Log-out</a> first!'
            });
        }

        const { email, password } = req.body;

        if (!email)
            return data.setData({ error: 'Email required!' });
        if (!password)
            return data.setData({ error: 'Password required!' });


        try {
            // If password or email is incorrect it will throw an error!
            const loggedUser = await UserCrud.getUserWithEmailAndPassword(email, password);
            return SessionManager.logIn(data, loggedUser.id).redirect('/');
        }
        catch (e) {
            console.log(e);
            let errorMessage = e;
            if (typeof errorMessage == 'object')
                errorMessage = errorMessage.toString();
            return data.setData({ error: errorMessage });
        }
    }

}

module.exports = LoginModel;