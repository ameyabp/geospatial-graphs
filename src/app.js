/*
    geospatial-graphs entry point
*/
import { Database } from "./database.js";
import { Server } from "./server.js"

const db = new Database("../data/iwc/nodes.csv", "../data/iwc/edges.csv");
const server = new Server(db);