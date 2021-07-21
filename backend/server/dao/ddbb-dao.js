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
            const sql = "SELECT * FROM View;";
            return (new Promise((resolve, reject) => {
                database.all(sql, [], (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(data);
                    }
                });
            }));
        },
        new: function (database, params) {
            const sql = "INSERT INTO View (name,description,usingFiltroMayores,creationDate,userId,stateId) VALUES (?,?,?,?,?,?)";
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

        update: function (database, params) {
            const sql = "UPDATE View SET (name=?,description=?,usingFiltroMayores=?,creationDate=?,userId=?,stateId=?) WHERE id=?";
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


        remove: function (database, params) {
            const sql = "DELETE FROM View WHERE id=?";
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
}

module.exports = DBDaoClass