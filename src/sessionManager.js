const { database } = require('./database');
const { User } = require('./user');
const UserCrud = require('./userCrud');

require('dotenv').config({silent: true});
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_TOKEN;

function getUserIdToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: 86400 });
}

function getDecodedId(token) {
    return new Promise( (resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) reject(err);
            else {
                resolve(decoded.userId);
            }
        });
    });
}

async function getLoggedUser(cookies) {
    const token = cookies.userId;
    let decodedId = -1;

    try {
        decodedId = await getDecodedId(token);
    }
    catch (e) {
        console.error('JWT ERROR: ', e);
    }

    if (decodedId == -1) {
        return User.anonymous();
    }
    else {
        return await UserCrud.getUserFromID(decodedId);
    }
}

function logIn(data, userId) {

    return data.setCookie('userId', getUserIdToken(userId));
}

function logOut(data) {
    return data.setCookie('userId', getUserIdToken(-1));
}

module.exports = { getLoggedUser, logIn, logOut }