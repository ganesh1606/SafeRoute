import { useEffect, useState } from "react";
import { getRoute, getHeatmap, checkAlert, sendSOS } from "./api";
import { speak } from "./voice";
import Map from "./Map";

export default function App() {
  const [user, setUser] = useState(null);
  const [dest, setDest] = useState(null);
  const [route, setRoute] = useState(null);
  const [heatmap, setHeatmap] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(p => {
      setUser({ lat: p.coords.latitude, lon: p.coords.longitude });
    });
    getHeatmap().then(setHeatmap);
  }, []);

  useEffect(() => {
    if (user && dest) {
      getRoute(user, dest).then(setRoute);
    }
  }, [user, dest]);

  useEffect(() => {
    if (!user) return;
    const id = setInterval(() => {
      checkAlert(user).then(r => {
        if (r.alert) {
          speak(r.alert);
          alert(r.alert);
        }
      });
    }, 6000);
    return () => clearInterval(id);
  }, [user]);

  if (!user) return <h3>📡 Getting GPS…</h3>;

  return (
    <>
      <button onClick={() => sendSOS(user)}>🚨 SOS</button>
      <Map user={user} dest={dest} route={route} heatmap={heatmap} setDest={setDest} />
      {route && <div>📍 {route.distance_km} km | ⏱ {route.eta_min} min</div>}
    </>
  );
}
