// server/index.js
const express = require("express");
const bodyParser = require('body-parser');
const md5 = require("md5");
const config = require("./config/server-configuration");
const db = require("./db/db");
const DDBBController = require("./controllers/ddbb-controller");
const cors = require('cors'); 

// create application/json parser
let jsonParser = bodyParser.json();

let app = express();
let DBController = new DDBBController(db);


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

app.use(cors());

app.listen(config.PORT, () => {
    console.log(`Server listening on ${config.PORT}`);
});


app.post("/api/user/login", jsonParser, (req, res) => {
    console.log("request received");
    try {
        const params = req.body;

        DBController.user.login(db, params.username, md5(params.password)).then((data) => {
            res.status(200).json(data);
            return;
        }).catch((error) => {
            console.log("[error /api/user/login/] ",error);
            res.status(400).json(error);
            return;
        });
    }
    catch (error) {
        console.log("[main error /api/user/login/] ",error);
        res.status(400).json({ "error": error });
    }
});

// Default response for any other request
app.use(function (req, res) {
    console.log("request received bad request");
    res.status(404).json({ "error": "Bad Request" });
    return;
});