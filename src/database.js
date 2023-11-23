const duckdb = require("duckdb");

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
        console.log(res);
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
        console.log(res[0]);
    });
});