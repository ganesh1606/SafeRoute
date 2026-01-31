import { useEffect, useState } from "react";
import MapView from "./MapView";
import { getSmartRoutes } from "./api";
import useLiveGPS from "./hooks/useLiveGPS";
import useDestinationSearch from "./hooks/useDestinationSearch";

export default function App() {
  const { location, error } = useLiveGPS();
  const { results, search } = useDestinationSearch();

  const [destination, setDestination] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!location || !destination) return;

    getSmartRoutes(location, destination).then(setRoutes);
  }, [location, destination]);

  if (error) return <h2>GPS Error: {error}</h2>;
  if (!location) return <h2>📡 Waiting for GPS…</h2>;

  return (
    <div style={{ height: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>
        🛡️ SafeRoute – Smart Navigation
      </h2>

      {/* Destination Search */}
      <div style={{ padding: "10px" }}>
        <input
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            search(e.target.value);
          }}
          placeholder="Search destination..."
          style={{ width: "100%", padding: "8px" }}
        />

        {results.map((r, i) => (
          <div
            key={i}
            onClick={() => {
              setDestination({ lat: r.lat, lon: r.lon });
              setQuery(r.name);
              setRoutes([]);
            }}
            style={{
              padding: "6px",
              cursor: "pointer",
              borderBottom: "1px solid #ccc"
            }}
          >
            📍 {r.name}
          </div>
        ))}
      </div>

      {/* Route Options */}
      <div style={{ display: "flex", gap: "8px", padding: "8px" }}>
        {routes.map((r, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "6px",
              borderRadius: "6px",
              cursor: "pointer",
              background:
                r.risk_level === "SAFE"
                  ? "#c8f7c5"
                  : r.risk_level === "MODERATE"
                    ? "#ffe6b3"
                    : "#f7c5c5",
              border: i === active ? "2px solid black" : "1px solid gray"
            }}
          >
            Route {i + 1}<br />
            {r.risk_level}<br />
            {r.distance_km} km · {r.duration_min} min
          </button>
        ))}
      </div>

      {/* Map */}
      <div style={{ height: "70%" }}>
        <MapView
          routes={routes}
          activeIndex={active}
          user={location}
        />
      </div>
    </div>
  );
}
