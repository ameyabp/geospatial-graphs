import duckdb from "duckdb"

class Database {
    static db = null;

    constructor(nodesFilePath, edgesFilePath) {
        this.db = new duckdb.Database(':memory:', (err) => {
            if (err) {
                throw err;
                console.log(err);
            }

            // this.db.run('CREATE TABLE nodes AS FROM ?', nodesFilePath, function(err) {
            //     if (err) {
            //         console.log(err);
            //         throw err;
            //     }
            //     db.all('SELECT * FROM nodes', function (err, res) {
            //         if (err) {
            //             console.log(err);
            //             throw err;
            //         }
            //         console.log(f`Loaded ${res.length} rows in nodes`);
            //     });
            // });

            // this.db.run('CREATE TABLE edges AS FROM ?', edgesFilePath, function(err) {
            //     if (err) {
            //         console.log(err);
            //         throw err;
            //     }
            //     db.all('SELECT * FROM edges', function (err, res) {
            //         if (err) {
            //             console.log(err);
            //             throw err;
            //         }
            //         console.log(f`Loaded ${res.length} rows in edges`);
            //     });
            // });
        });
    }
}

export { Database };