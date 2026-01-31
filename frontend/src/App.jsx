import { useEffect, useState } from "react";
import MapView from "./MapView";
import { getSmartRoutes } from "./api";
import useLiveGPS from "./hooks/useLiveGPS";
import useDestinationSearch from "./hooks/useDestinationSearch";

export default function App() {
  const { location, error } = useLiveGPS();
  const { results, search, clearResults } = useDestinationSearch();

  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [active, setActive] = useState(0);

  // 🔁 Auto reroute when user moves OR destination changes
  useEffect(() => {
    if (!location || !destination) return;

    getSmartRoutes(location, destination).then(data => {
      setRoutes(data || []);
      setActive(0);
    });
  }, [location, destination]);

  if (error) return <h2>❌ GPS Error: {error}</h2>;
  if (!location) return <h2>📡 Waiting for GPS…</h2>;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <h2 style={{ textAlign: "center", margin: "10px 0" }}>
        🛡️ SafeRoute – Smart Navigation
      </h2>

      {/* Destination Search */}
      <div style={{ padding: "10px", position: "relative" }}>
        <input
          value={query}
          disabled={!!destination}
          onChange={e => {
            setQuery(e.target.value);
            search(e.target.value);
          }}
          placeholder="📍 Search destination..."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px"
          }}
        />

        {/* Suggestions */}
        {!destination && results.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: 0,
              right: 0,
              background: "white",
              border: "1px solid #ccc",
              zIndex: 1000
            }}
          >
            {results.map((r, i) => (
              <div
                key={i}
                onClick={() => {
                  setDestination({ lat: r.lat, lon: r.lon });
                  setQuery(r.name);
                  clearResults();
                  setRoutes([]);
                }}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee"
                }}
              >
                📍 {r.name}
              </div>
            ))}
          </div>
        )}

        {/* Change destination */}
        {destination && (
          <button
            onClick={() => {
              setDestination(null);
              setQuery("");
              setRoutes([]);
              clearResults();
            }}
            style={{
              marginTop: "8px",
              padding: "6px 10px",
              cursor: "pointer"
            }}
          >
            🔄 Change destination
          </button>
        )}
      </div>

      {/* Route Options */}
      {routes.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "8px",
            overflowX: "auto"
          }}
        >
          {routes.map((r, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                minWidth: "120px",
                padding: "8px",
                borderRadius: "6px",
                cursor: "pointer",
                border: i === active ? "2px solid black" : "1px solid gray",
                background:
                  r.risk_level === "SAFE"
                    ? "#c8f7c5"
                    : r.risk_level === "MODERATE"
                      ? "#ffe6b3"
                      : "#f7c5c5"
              }}
            >
              Route {i + 1}
              <br />
              <strong>{r.risk_level}</strong>
              <br />
              {r.distance_km} km · {r.duration_min} min
            </button>
          ))}
        </div>
      )}

      {/* Map */}
      <div style={{ flex: 1 }}>
        <MapView
          routes={routes}
          activeIndex={active}
          user={location}
        />
      </div>
    </div>
  );
}
