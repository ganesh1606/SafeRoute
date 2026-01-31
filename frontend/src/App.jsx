import { useEffect, useState } from "react";
import MapView from "./MapView.jsx";
import { getRoutes, getSafety, getDangerZones } from "./api.js";

export default function App() {
  const [routes, setRoutes] = useState([]);
  const [zones, setZones] = useState([]);
  const [safety, setSafety] = useState(null);

  useEffect(() => {
    getRoutes(
      { lat: 16.545, lon: 81.521 },
      { lat: 16.552, lon: 81.531 }
    ).then(setRoutes);

    getDangerZones().then(setZones);

    getSafety("Bhimavaram", "medium").then(setSafety);
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <h1 style={{ textAlign: "center", margin: "10px 0" }}>
        🛡️ SafeRoute
      </h1>

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
        <MapView routes={routes} dangerZones={zones} />
      </div>
    </div>
  );
}
