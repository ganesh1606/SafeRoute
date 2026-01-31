import { useEffect, useState } from "react";
import MapView from "./MapView";
import { getSmartRoutes } from "./api";
import useLiveGPS from "./hooks/useLiveGPS";

export default function App() {
  const { location, error } = useLiveGPS();
  const [routes, setRoutes] = useState([]);
  const [active, setActive] = useState(0);

  const destination = { lat: 16.552, lon: 81.531 };

  useEffect(() => {
    if (!location) return;

    getSmartRoutes(location, destination).then(setRoutes);
  }, [location]); // 🔥 AUTO REROUTE ON MOVE

  if (error) return <h2>GPS Error: {error}</h2>;
  if (!location) return <h2>📡 Waiting for GPS…</h2>;

  return (
    <div style={{ height: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>
        🛡️ SafeRoute – Live GPS Navigation
      </h2>

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

      <div style={{ height: "80%" }}>
        <MapView
          routes={routes}
          activeIndex={active}
          user={location}
        />
      </div>
    </div>
  );
}
