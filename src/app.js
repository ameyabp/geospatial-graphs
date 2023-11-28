/*
    geospatial-graphs entry point
*/
import { Server } from "./server.js"

const server = new Server("../data/iwc/nodes.csv", "../data/iwc/edges.csv");