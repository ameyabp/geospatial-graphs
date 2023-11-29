import { port, frontendDir } from "./utility.js"
import { Database } from "./database.js"

import express from "express"

function indexFunction(req, res) {
    // res.send("Hello World!");
    const options = {
        root: frontendDir
    }
    res.sendFile("index.html", options, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            console.log("Sent index.html")
        }
    });
} 

function getData(req, res) {
    console.log("Fetching data from DB");
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
        this.app.use(express.static(frontendDir));

        // register route methods for server
        this.app.get("/", indexFunction);
        this.app.post("/", getData);
        this.app.listen(port, listener);
    }
}

export { Server };