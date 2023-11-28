import duckdb from "duckdb"

class Database {
    static db = null;
    static conn = null;

    constructor(nodesFilePath, edgesFilePath) {
        this.db = new duckdb.Database(':memory:', (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        
        this.db.run(`CREATE TABLE nodes AS FROM '${nodesFilePath}'`, function(err) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log("Loaded nodes");
        });

        this.db.run(`CREATE TABLE edges AS FROM '${edgesFilePath}'`, function(err) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log("Loaded edges");
        });
    }
}

export { Database };