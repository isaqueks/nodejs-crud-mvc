const sqlLite3 = require('sqlite3').verbose();

function Database(dbFile) {
    var db = new sqlLite3.Database(dbFile, (err) => {
        if (err) {
            console.error('Could not connect to database', err);
            return;
        } else {
            console.log('\n\n------< Connected to Database >------\n\n');
        }
    });
    return {
        db: db,
        runSql: function(query, params, callback) {
            this.db.run(query, params, callback);
        },
        getSql: function(query, params, callback) {
            this.db.get(query, params, callback);
        },
        allSql: function (query, params, callback) {
            this.db.all(query, params, callback);
        },
        Select: function(query, params, callback) {
            this.db.run('SELECT ' + query, params, callback);
        },
        promise: function (query, params) {
            var db = this;
            return new Promise((resolve, reject) => {
                db.allSql(query, params, (err, data) => {

                    if (err)
                        reject(err);
                    else
                        resolve(data);

                })
            });
        }
    }
}

module.exports = { Database }