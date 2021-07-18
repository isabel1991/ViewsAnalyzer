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

app.use(cors());

app.listen(config.PORT, () => {
    console.log(`Server listening on ${config.PORT}`);
});


app.post("/api/user/login", jsonParser, (req, res) => {

    try {
        const params = req.body;

        DBController.user.login(db, params.username, md5(params.password)).then((data) => {
            res.status(200).json(data);

        }).catch((error) => {
            console.log("[error /api/user/login/] ", error, "params", params);
            res.status(400).json(error);

        });
    }
    catch (error) {
        console.log("[main error /api/user/login/] ", error);
        res.status(400).json({ "error": error });
    }
});

app.get("/api/view/getAll", jsonParser, (req, res) => {

    try {
        DBController.view.getAll(db).then((data) => {
            res.status(200).json(data);

        }).catch((error) => {
            console.log("[error /api/view/getAll] ", error);
            res.status(400).json(error);

        });
    }
    catch (error) {
        console.log("[main error /api/view/getAll] ", error);
        res.status(400).json({ "error": error });
    }
});

app.post("/api/view/new", jsonParser, (req, res) => {

    try {
        const params = req.body;
        DBController.view.new(db,params).then((data) => {
            res.status(200).json(data);

        }).catch((error) => {
            console.log("[error /api/view/new] ", error, "params", params);
            res.status(400).json(error);

        });
    }
    catch (error) {
        console.log("[main error /api/view/new] ", error);
        res.status(400).json({ "error": error });
    }
});

app.get("/api/table/getColumns", jsonParser, (req, res) => {

    try {
        const params = req.body;

        DBController.table.getColumns(db, params.table).then((data) => {
            res.status(200).json(data);

        }).catch((error) => {
            console.log("[error /api/table/getColumns] ", error);
            res.status(400).json(error);

        });
    }
    catch (error) {
        console.log("[main error /api/table/getColumns] ", error, "params", params);
        res.status(400).json({ "error": error });
    }
});

// Default response for any other request
app.use(function (req, res) {
    console.log("request received doesn't exists");
    res.status(404).json({ "error": "Bad Request" });
});