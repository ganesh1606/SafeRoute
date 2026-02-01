import { useEffect } from "react";

export default function useDangerAlert(user, routes) {
  useEffect(() => {
    if (!user) return;
    for (const r of routes) {
      for (const s of r.segments) {
        if (
          Math.abs(user.lat - s.lat) +
            Math.abs(user.lon - s.lon) <
            0.0006 &&
          s.risk_level === "UNSAFE"
        ) {
          navigator.vibrate?.([200, 100, 200]);
          alert("🚨 DANGER ZONE AHEAD");
          return;
        }
      }
    }
  }, [user, routes]);
}
