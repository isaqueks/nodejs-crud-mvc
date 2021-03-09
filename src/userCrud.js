const { database } = require('../src/database');
const Password = require('../src/password');
const { User } = require('./user');

module.exports = {

    async checkIfExists(email) {

        let user = await database.promise('SELECT * FROM users WHERE email = ?', email);
        return (user && user.length == 1);

    },

    checkDatabaseRecord(data) {
        if (!data || data.length <= 0) {
            throw new Error('An error ocurred: No such user for specified parameter!' + JSON.stringify(data));
        }
        else if (data.length != 1) {
            throw new Error('Too many records for the specified parameter!' + JSON.stringify(data));
        }
    },

    constructUserFromDatabaseRecord(data) {
        this.checkDatabaseRecord(data);
        const user = data[0];
        return new User(user.id, user.name, user.email, user.description, user.passwordHash);
    },

    async getUserFromEmail(email) {
        if (!await this.checkIfExists(email))
            throw new Error('Not user for email ' + email);
        
        const data = await database.promise(
            'SELECT * FROM users WHERE email = ?',
            email
        );

        return this.constructUserFromDatabaseRecord(data);

    },

    async getUserFromID(id) {
        
        const data = await database.promise(
            'SELECT * FROM users WHERE id = ?',
            id
        );

        return this.constructUserFromDatabaseRecord(data);

    },

    async register(name, email, description, password) {

        if (await this.checkIfExists(email))
            throw new Error('An user with this email address already exists!');
        
        let passHash = await Password.hash(password);

        await database.promise(
            'INSERT INTO users (name, email, description, passwordHash) '+
            'VALUES (?, ?, ?, ?)', [ name, email, description, passHash ]);

        return await this.getUserFromEmail(email);

    },

    async getUserWithEmailAndPassword(email, password) {
        let user = await this.getUserFromEmail(email);
        if (!(await Password.compare(password, user.passwordHash)))
            throw new Error('Invalid password!');

        return user;
    },

    async update(user) {

        // If user does not exist, it will throw an error
        await this.getUserFromID(user.id);

        try {
            const userWithNewEmail = await this.getUserFromEmail(user.email);
            if (userWithNewEmail.id != user.id)
                throw new Error('An user with this email already exists!');
        }
        catch {}

        await database.promise('UPDATE users SET name = ?, email = ?, description = ? WHERE id = ?',
        [ user.name, user.email, user.description, user.id ]);

        return user;
    },

    async delete(user) {

        // If user does not exist, it will throw an error
        await this.getUserFromID(user.id);
        await database.promise('DELETE FROM users WHERE id = ?', user.id);
    }

};