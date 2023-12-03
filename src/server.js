import { port, frontendDir, inLogger } from "./utility.js"

import express from "express"

// refer https://expressjs.com/en/4x/api.html#req for how to process incoming HTTPRequest
// refer https://expressjs.com/en/4x/api.html#res for how to prepare outgoing HTTPResponse

class Server {
    app = null;
    db = null;

    index(request, response) {
        logger(request);
        const options = {
            root: frontendDir   // for convenience in specifying the index file path
        }
        response.sendFile("index.html", options, (err) => {
            if (err) throw err;
        });
    } 
    
    getNodes(request, response, db) {
        inLogger(request);
        db.getNodes(request, response);
    }

    getEdges(request, response, db) {
        inLogger(request);
        db.getEdges(request, response);
    }
    
    listener() {
        console.log(`Geospatial-graphs listening on port ${port}!`);
    }

    constructor(databaseInstance, handler) {
        this.db = databaseInstance;
        this.app = express();
        this.app.use(express.static(frontendDir));
        this.app.use(express.json());

        // register route methods for server
        this.app.get("/", this.index);
        this.app.post("/getNodes", (request, response) => this.getNodes(request, response, this.db));
        this.app.post("/getEdges", (request, response) => this.getEdges(request, response, this.db));
        this.app.listen(port, this.listener);
    }
}

export { Server };