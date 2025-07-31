import { createRoot } from "react-dom/client";
import { Map, NavigationControl, useControl } from "react-map-gl/maplibre";
import { GeoJsonLayer } from "deck.gl";
import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox";
import "maplibre-gl/dist/maplibre-gl.css";

import { HealthMap } from "./components/HealthMap.tsx";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <HealthMap />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const container = document.body.appendChild(document.createElement("div"));
createRoot(container).render(<Root />);
