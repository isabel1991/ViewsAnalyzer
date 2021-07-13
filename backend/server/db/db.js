const config = require("../config/server-configuration");

let sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(config.DATABASE.NAME, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
    }
});

module.exports = db