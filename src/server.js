import { port } from "./utility.js"
import { Database } from "./database.js"

import express from "express"

function indexFunction(req, res) {
    res.send("Hello World!");
} 

function listener() {
    console.log(`Example app listening on port ${port}!`);
}

class Server {
    static app = null;
    static db = null;
    
    constructor() {
        this.db = new Database();
        this.app = express();

        // register route methods for server
        this.app.get("/", indexFunction);
        this.app.listen(port, listener);
    }
}

export { Server };