import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Map, NavigationControl, useControl } from "react-map-gl/maplibre";
import { GeoJsonLayer } from "deck.gl";
import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox";
import "maplibre-gl/dist/maplibre-gl.css";

const countryData = {
  BRA: 75,
  CAN: 30,
  IND: 90,
  // etc.
};

// GeoJSON with country borders
const COUNTRY_BORDERS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson";

const INITIAL_VIEW_STATE = {
  latitude: 20,
  longitude: 0,
  zoom: 1.5,
  bearing: 0,
  pitch: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

function DeckGLOverlay({ layers }) {
  const overlay = useControl(() => new DeckOverlay({ layers }));
  overlay.setProps({ layers });
  return null;
}

function Root() {
  const layers = [
    new GeoJsonLayer({
      id: "countries",
      data: COUNTRY_BORDERS,
      pickable: true,
      autoHighlight: true,
      highlightColor: [255, 0, 0, 40], // semi-transparent red
      stroked: true,
      filled: true,
      getLineColor: [80, 80, 80],
      getFillColor: (f) => {
        const value = countryData[f.properties.adm0_a3];
        if (value === undefined) return [200, 200, 200, 80]; // default color for missing data

        // Example: Red intensity based on value (0–100)
        return [255, 0, 0, Math.min(255, value)];
      },
      lineWidthMinPixels: 1,
    }),
  ];

  return (
    <Map initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE}>
      <DeckGLOverlay layers={layers} />
      <NavigationControl position="top-left" />
    </Map>
  );
}

const container = document.body.appendChild(document.createElement("div"));
createRoot(container).render(<Root />);
