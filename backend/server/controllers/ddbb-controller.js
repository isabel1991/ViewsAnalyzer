const DBDaoClass = require("../dao/ddbb-dao");

const DB_DAO = new DBDaoClass();

function DBControllerClass() {

    this.describeTable = function () {
        // pragma table_info('albums')
    }

    this.user = {
        login: function (database, username, password) {
            const params = [username, password];

            return (new Promise(function (resolve, reject) {
                DB_DAO.user.login(database, params).then((user) => {
                    console.log("user",user);
                    let t_user = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin==1?true:false,
                        manager: user.manager
                    }

                    resolve(t_user);
                }).catch((error) => {
                    console.log(error);
                    reject('El usuario no ha sido encontrado.')
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

module.exports = DBControllerClass