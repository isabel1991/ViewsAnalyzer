const DBDaoClass = require("../dao/ddbb-dao");

const DB_DAO = new DBDaoClass();

function DBControllerClass() {

    this.table = {
        getColumns: function (database, table) {
            const params = table;

            return (new Promise(function (resolve, reject) {
                DB_DAO.table.getColumns(database, params).then((data) => {
                    let columns = [];

                    const result = ((data.sql + "").split("CREATE TABLE '" + table + "' (\n")[1]).split("CONSTRAINT")[0].split("\,\n");

                    for (let row of result) {
                        if (row.trim().length > 0) {
                            let fieldName = row.split("\'")[1],
                                fieldType = row.split("\'")[2].split(" ")[1],
                                others = row.split("\'")[2].split(" ");
                            let defaultFlag = false;
                            others = others.map(function (value, index) {
                                let response;
                                if (defaultFlag) {
                                    defaultFlag = false;
                                    if (["0", "1"].indexOf(value) != -1)
                                        response = value == "1" ? "DEFAULT true" : "DEFAULT false";
                                    else
                                        response = "DEFAULT " + value;
                                }
                                else {
                                    switch (value.trim()) {
                                        case "NULL":
                                        case "KEY":
                                        case "":
                                        case fieldType:
                                        case "0":
                                        case "1":

                                            break;
                                        case "PRIMARY":
                                            response = value + " KEY";
                                            break;
                                        case "NOT":
                                            response = value + " NULL";
                                            break;
                                        case "DEFAULT":
                                            defaultFlag = true;
                                            break;
                                        default:
                                            response = value;
                                            break;
                                    }
                                }
                                return response;
                            }).filter((e) => e != null);

                            let rowObject = {
                                'name': fieldName,
                                'type': fieldType,
                                'modifiers': others
                            }

                            columns.push(rowObject);
                        }
                    }


                    resolve({ "columns": columns });
                }).catch((error) => {
                    reject('No se ha podido conseguir las columnas de la tabla', table);
                });
            }));
        }
    }

    this.user = {
        login: function (database, username, password) {
            const params = [username, password];

            return (new Promise(function (resolve, reject) {
                DB_DAO.user.login(database, params).then((user) => {

                    let t_user = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin == 1 ? true : false,
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

    this.view = {
        getAll: function (database) {
            return (new Promise(function (resolve, reject) {
                DB_DAO.view.getAll(database).then((views) => {
                    resolve(views);
                }).catch((error) => {
                    console.log(error);
                    reject('No se ha podido conseguir la información de las vistas.')
                });
            }));
        },
        new: function (database, viewParams) {
            const params = [
                viewParams.name,
                viewParams.description,
                viewParams.usingFiltroMayores,
                viewParams.creationDate,
                viewParams.userId,
                viewParams.stateId
            ];
            return (new Promise(function (resolve, reject) {
                DB_DAO.view.new(database, params).then(() => {
                    resolve(true);
                }).catch((error) => {
                    console.log(error);
                    reject('Ha habido un problema al insertar la ventana.')
                });
            }));
        },
        remove: function (database, viewParams) {
            const params = [viewParams.id];
            return (new Promise(function (resolve, reject) {
                DB_DAO.view.remove(database, params).then(() => {
                    resolve(true);
                }).catch((error) => {
                    console.log(error);
                    reject('Ha habido un problema al eliminar la ventana.')
                });
            }));
        }
    }
}

module.exports = DBControllerClass