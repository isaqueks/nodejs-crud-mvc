class User {
    constructor(id, name, email, description, passwordHash) {
        this.id             = id;
        this.name           = name;
        this.email          = email;
        this.description    = description;
        this.passwordHash   = passwordHash;
        this.loggedIn = true;
    }

    static anonymous() {
        let anon = new User(-1, null, null, null, null);
        anon.loggedIn = false;
        return anon;
    }
}

module.exports = { User };