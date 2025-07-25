import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function App() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
    />
  );
}
