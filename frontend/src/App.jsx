import { useEffect, useState } from "react";
import MapView from "./MapView.jsx";
import useGPS from "./hooks/useGPS";
import { getRoutes, getSafety, getDangerZones } from "./api.js";

export default function App() {
  const { location, error } = useGPS();
  const [routes, setRoutes] = useState([]);
  const [zones, setZones] = useState([]);
  const [safety, setSafety] = useState(null);

  const destination = { lat: 16.552, lon: 81.531 };

  useEffect(() => {
    if (!location) return;

    getRoutes(location, destination).then(setRoutes);
    getDangerZones().then(setZones);
    getSafety("Bhimavaram", "medium").then(setSafety);
  }, [location]);

  if (error) return <h2>GPS Error: {error}</h2>;
  if (!location) return <h2>📡 Waiting for GPS permission...</h2>;

  return (
    <div style={{ height: "100%" }}>
      <h1 style={{ textAlign: "center" }}>🛡️ SafeRoute (Live GPS)</h1>

      {safety && (
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color:
              safety.route_color === "GREEN"
                ? "green"
                : safety.route_color === "YELLOW"
                  ? "orange"
                  : "red"
          }}
        >
          Risk: {safety.risk_level} (Score: {safety.risk_score})
        </div>
      )}

      <div style={{ height: "85%" }}>
        <MapView
          routes={routes}
          dangerZones={zones}
          userLocation={location}
        />
      </div>
    </div>
  );
}
