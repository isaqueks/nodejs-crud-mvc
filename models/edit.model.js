const Model = require('../src/model');
const ModelData = require('../src/modelData');
const CookieParser = require('../src/cookieParser');
const SessionManager = require('../src/sessionManager');
const UserCrud = require('../src/userCrud');

class EditModel extends Model {

    async Get(req) {
        let data = new ModelData();

        const cookies = CookieParser.getCookies(req);
        const user = await SessionManager.getLoggedUser(cookies);

        if (!user.loggedIn) { // Not anonymous
            return data.setData({
                error: 'You are not logged-in! <a href="login">Log-in</a> first!',
                user: user
            });
        }

        return data.setData({ user });
    }

    async Post(req) {
        let data = new ModelData();
        const cookies = CookieParser.getCookies(req);
        const user = await SessionManager.getLoggedUser(cookies);
        data.setData({ user })

        if (!user.loggedIn) { // Not anonymous
            return data.addData({
                error: 'You are not logged-in! <a href="login">Log-in</a> first!',
            });
        }

        const { name, email, description } = req.body;


        if (!name)
            return data.addData({ error: 'Name required!' });
        if (!email)
            return data.addData({ error: 'Email required!' });
        if (!description)
            return data.addData({ error: 'Description required!' });

        try {
            user.email = email;
            user.name = name;
            user.description = description;

            const updatedUser = await UserCrud.update(user);
            return SessionManager
                .logIn(data, updatedUser.id)
                .setData({ user: updatedUser });
        }
        catch (e) {
            let errorMessage = e;
            if (typeof errorMessage == 'object')
                errorMessage = errorMessage.toString();
            return data.addData({ error: errorMessage });
        }
    }

}

module.exports = EditModel;