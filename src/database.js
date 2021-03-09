const db = require('./databaseInterface');
const database = db.Database('db.sqlite3');

module.exports = { database };