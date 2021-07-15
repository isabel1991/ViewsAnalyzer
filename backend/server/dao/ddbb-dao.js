function DBDaoClass() {

    this.table = {

        getColumns: function (database, params) {

            const sql = `SELECT * FROM sqlite_master WHERE type='table' AND name=?`;
            return (new Promise((resolve, reject) => {
                database.get(sql, params, (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(data);
                    }
                });
            }));
        }
    }

    this.user = {
        login: function (database, params) {
            const sql = "SELECT * from USER WHERE username=? AND password=?;";
            return (new Promise((resolve, reject) => {
                database.get(sql, params, (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(data);
                    }
                });
            }));
        },
        create: function (username, email, password, isAdmin, manager) {
            const sql = "insert into User ('username','email','password','isAdmin','manager') VALUES(?,?,?,?,?);"
        },
        update: function (userId, username, email, password, isAdmin, manager) {
            const sql = "";

        },
        delete: function (userId) {
            const sql = "";

        }
    }

    this.view = {
        getAll: function (database) {
            const sql = "SELECT * from View";
            return (new Promise((resolve, reject) => {
                database.get(sql, [], (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(data);
                    }
                });
            }));
        }
    }
}

module.exports = DBDaoClass