const express = require("express");
const duckdb = require("duckdb");

const app = express();
const port = 8000;

const db = new duckdb.Database(':memory:', (err) => {
    if (err) throw err;
});

db.run('CREATE TABLE nodes AS FROM "../data/iwc/nodes.csv"', function(err, res) {
    if (err) {
        console.log(err);
        throw err;
    }
    db.all('SELECT * FROM nodes', function (err, res) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(res.length);
    });
});

db.run('CREATE TABLE edges AS FROM "../data/iwc/edges.csv"', function(err, res) {
    if (err) {
        console.log(err);
        throw err;
    }
    db.all('SELECT * FROM edges', function (err, res) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(res.length);
    });
});

app.get("/", function (req, res) {
    res.send("Hello World!");
}); 

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});