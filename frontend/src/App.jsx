import { useEffect, useState } from "react";
import MapView from "./MapView";
import { getSmartRoutes } from "./api";

export default function App() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    getSmartRoutes(
      { lat: 16.545, lon: 81.521 },
      { lat: 16.552, lon: 81.531 }
    ).then(setRoutes);
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <h2>🛡️ SafeRoute – AI Navigation</h2>

      {routes.map((r, i) => (
        <div key={i}>
          Route {i + 1} →
          Risk: {r.risk_level} |
          Score: {r.risk_score}
        </div>
      ))}

      <div style={{ height: "85%" }}>
        <MapView routes={routes} />
      </div>
    </div>
  );
}
