import { useEffect, useRef, useState } from "react";
import MapView from "./MapView";

const BACKEND = "https://saferoute-e6bg.onrender.com";

export default function App() {
  const user = useRef({ lat: 16.545, lon: 81.521 });

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [destination, setDestination] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [heatmap, setHeatmap] = useState([]);

  // GPS (single safe read)
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        user.current = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        };
      },
      () => { }
    );
  }, []);

  // Search
  async function searchPlace(q) {
    if (!q) return;
    const r = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${q}`
    );
    const d = await r.json();
    setResults(
      d.slice(0, 5).map(p => ({
        name: p.display_name,
        lat: +p.lat,
        lon: +p.lon
      }))
    );
  }

  // Routes
  useEffect(() => {
    if (!destination) return;

    fetch(`${BACKEND}/smart-route/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: user.current,
        destination,
        area: "Bhimavaram",
        time: "night"
      })
    })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRoutes(
            data.filter(r => r.geometry && r.geometry.coordinates)
          );
        } else {
          setRoutes([]);
        }
      })
      .catch(() => setRoutes([]));
  }, [destination]);

  // Heatmap
  useEffect(() => {
    fetch(`${BACKEND}/heatmap/`)
      .then(r => {
        if (!r.ok) return [];
        return r.json();
      })
      .then(data => {
        setHeatmap(Array.isArray(data) ? data : []);
      })
      .catch(() => setHeatmap([]));
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      {/* Search */}
      <div style={{ padding: 8 }}>
        <input
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            searchPlace(e.target.value);
          }}
          placeholder="Search destination..."
          style={{ width: "100%", padding: 8 }}
        />
        {results.map((r, i) => (
          <div
            key={i}
            onClick={() => {
              setDestination({ lat: r.lat, lon: r.lon });
              setQuery(r.name);
              setResults([]);
            }}
            style={{ padding: 6, cursor: "pointer" }}
          >
            📍 {r.name}
          </div>
        ))}
      </div>

      {/* Map */}
      <div style={{ height: "85%" }}>
        <MapView
          user={user.current}
          destination={destination}
          routes={routes}
          heatmap={heatmap}
        />
      </div>
    </div>
  );
}
