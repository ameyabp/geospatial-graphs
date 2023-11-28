import { port } from "./utility.js"
import { Database } from "./database.js"

import express from "express"

function indexFunction(req, res) {
    res.send("Hello World!");
} 

function listener() {
    console.log(`Geospatial-graphs listening on port ${port}!`);
}

class Server {
    static app = null;
    static db = null;
    
    constructor(nodesFilePath, edgesFilePath) {
        this.db = new Database(nodesFilePath, edgesFilePath);
        this.app = express();

        // register route methods for server
        this.app.get("/", indexFunction);
        this.app.listen(port, listener);
    }
}

export { Server };