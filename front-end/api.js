"use strict";

import { port } from "./utility.js";

/**
   * Fetch all nodes from the backend and returns it. 
   * Returns undefined if response is not successful
   * @returns {Object[]} Fetched nodes
   */
async function fetchNodes() {
    try {
        const response = await fetch(`http://localhost:${port}/getNodes`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                min_lon: -180,
                max_lon: 180,
                min_lat: -90,
                max_lat: 90
            })
        });

        if (!response.ok) {
            throw response.status;
        }

        const json = await response.json();
        console.log("Node count: " + json.length);
        return json;
    } catch (error) {
        console.error("Error fetching nodes:", error);
    }
}

/**
 * Fetch all edges from the backend and returns it. 
 * Returns undefined if response is not successful
 * @returns {Object[]} Fetched edges
 */
async function fetchEdges() {
    try {
        const response = await fetch(`http://localhost:${port}/getEdges`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                min_lon: -180,
                max_lon: 180,
                min_lat: -90,
                max_lat: 90
            })
        });

        if (!response.ok) {
            throw response.status;
        }

        const json = await response.json();
        console.log("Edge count: " + json.length);
        return json;
    } catch (error) {
        console.error("Error fetching edges:", error);
    }
}

export {fetchNodes, fetchEdges};