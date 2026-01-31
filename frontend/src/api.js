const BASE = "https://saferoute.onrender.com";

export async function getRoutes(src, dst) {
  const res = await fetch(
    `${BASE}/routes/?src_lat=${src.lat}&src_lon=${src.lon}&dst_lat=${dst.lat}&dst_lon=${dst.lon}`
  );
  return res.json();
}

export async function getSafety(area, crowd) {
  const res = await fetch(`${BASE}/safe-route/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ area, crowd })
  });
  return res.json();
}

export async function getDangerZones() {
  const res = await fetch(`${BASE}/static/danger_zones.json`);
  return res.json();
}
