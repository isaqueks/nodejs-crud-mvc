const bcrypt = require('bcrypt');
const SALT = '$_SALT_!@#$%¨&*()';
const ROUNDS = 10;

function hash(password) {
    return bcrypt.hash(SALT + password, ROUNDS);
}

function compare(password, hash) {
    return bcrypt.compare(SALT + password, hash);
}

module.exports = { hash, compare };