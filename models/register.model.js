const Model = require('../src/model');
const ModelData = require('../src/modelData');
const CookieParser = require('../src/cookieParser');
const SessionManager = require('../src/sessionManager');
const UserCrud = require('../src/userCrud');

class RegisterModel extends Model {

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

        const { name, email, description, password, password2 } = req.body;

        if (!name)
            return data.setData({ error: 'Name required!' });
        if (!email)
            return data.setData({ error: 'Email required!' });
        if (!description)
            return data.setData({ error: 'Description required!' });
        if (!password)
            return data.setData({ error: 'Password required!' });
        else if (password.length < 4)
            return data.setData({ error: 'Password too weak!' });
        else if (password != password2)
            return data.setData({ error: 'Passwords don\'t match!' });

        try {
            const createdUser = await UserCrud.register(name, email, description, password);
            return SessionManager.logIn(data, createdUser.id).redirect('/');
        }
        catch (e) {
            let errorMessage = e;
            if (typeof errorMessage == 'object')
                errorMessage = errorMessage.toString();
            return data.setData({ error: errorMessage });
        }
    }

}

module.exports = RegisterModel;