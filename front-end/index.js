"use strict";

import { port } from "./utility.js";
import { createBaseMap } from "./base-map.js"

(function () {
    window.addEventListener("load", init);

    function init() {
        createBaseMap();

        // sample call to fetch node data
        fetch(`http://localhost:${port}/getNodes`, {
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
        }).then((response) => {
            if (!response.ok) {
                throw response.status;
            }
            return response.json();
        }).then((json) => {
            console.log("Node count: " + json.length);
        });

        fetch(`http://localhost:${port}/getEdges`, {
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
        }).then((response) => {
            if (!response.ok) {
                throw response.status;
            }
            return response.json();
        }).then((json) => {
            console.log("Edge count: " + json.length);
        });
    }
})();