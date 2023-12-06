"use strict";

import { fetchNodes, fetchEdges } from "./api.js";
import { createBaseMap } from "./base-map.js";
import { getRandomSample } from "./utility.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

(function () {
    window.addEventListener("load", init);

    function init() {
        const map = createBaseMap();

        // Add svg overlay to map
        L.svg().addTo(map);
        const overlay = d3.select(map.getPanes().overlayPane)
        const svg = overlay.select('svg')
            .attr("pointer-events", "auto")
            .attr("class", "leaflet-zoom-hide");

        addNodes(map, svg);
        addEdges(map, svg);
    }

    async function addNodes(map, svg) {
        const nodes = await fetchNodes();
        if (nodes === undefined || nodes === null) return;

        // Downsample to speed up
        const rand = getRandomSample(nodes, 1000);

        const dots = svg.selectAll("circles")
            .data(rand)
            .enter()
            .append("circle")
            .attr("cx", d => map.latLngToLayerPoint([d.lat, d.lon]).x)
            .attr("cy", d => map.latLngToLayerPoint([d.lat, d.lon]).y)
            .attr("r", 5)
            .style("fill", "steelblue")
            .style("opacity", 0.75)
            .style("stroke-width", 0)
            .style("stroke", "black")
            .on('mouseover', function () {
                d3.select(this).transition()
                    .duration(200)
                    .style("stroke-width", 1);
            })
            .on('mouseout', function () {
                d3.select(this).transition()
                    .duration(200)
                    .style("stroke-width", 0);
            });

        map.on("moveend", () => {
            dots.attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.lon]).x })
                .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.lon]).y })
        });
    }

    async function addEdges(map, svg) {
        const edges = await fetchEdges();
        if (edges === undefined || edges === null) return;

        // Downsample to speed up
        const rand = getRandomSample(edges, 1000);

        function projectPoint(x, y) {
            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
        }

        const transform = d3.geoTransform({ point: projectPoint });
        const path = d3.geoPath().projection(transform);

        const getPath = (d) => {
            const route = {
                type: "LineString",
                coordinates: [
                    [d.srcLon, d.srcLat],
                    [d.dstLon, d.dstLat]
                ]
            }
            return path(route);
        }

        const lines = svg.selectAll("path")
            .data(rand, d => d.edgeId)
            .enter()
            .append("path")
            .attr("d", d => getPath(d))
            .attr("stroke", "rgba(150, 150, 150, 0.7)")
            .style("stroke-width", 1)
            .style("fill", "None")
            .on("mouseover", () => {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("stroke-width", 2);
            })
            .on("mouseout", () => {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("stroke-width", 1);
            })

        map.on("moveend", () => {
            lines.attr("d", d => getPath(d));
        });
    }
})();