function DBDaoClass() {

    this.describeTable = function () {
        // pragma table_info('albums')
    }

    this.user = {
        login: function (database,params) {
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
}

module.exports = DBDaoClass