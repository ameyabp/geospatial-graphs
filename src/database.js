import duckdb from "duckdb"
import { outLogger } from "./utility.js";

class Database {
    db = null;

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

    getNodes(request, response) {
        const bbox = request.body;
        const connection = this.db.connect();
        connection.all('SELECT * FROM nodes WHERE lon BETWEEN ? AND ? AND lat BETWEEN ? AND ?', 
                    bbox.min_lon, bbox.max_lon, bbox.min_lat, bbox.max_lat, 
                    (err, res) => {
                        if (err) throw err;
                        response.json(res);
                        outLogger(request);
                    });
    }

    getEdges(request, response) {
        const bbox = request.body;
        const connection = this.db.connect();
        connection.all('SELECT * FROM edges WHERE (srcLon BETWEEN ? AND ? AND srcLat BETWEEN ? AND ?) OR (dstLon BETWEEN ? AND ? AND dstLat BETWEEN ? AND ?)',
                    bbox.min_lon, bbox.max_lon, bbox.min_lat, bbox.max_lat, bbox.min_lon, bbox.max_lon, bbox.min_lat, bbox.max_lat,
                    (err, res) => {
                        if (err) throw err;
                        response.json(res);
                        outLogger(request);
                    });
    }
}

export { Database };