const BASE = "https://saferoute-e6bg.onrender.com";

export const getSmartRoutes = (s, d) =>
  fetch(`${BASE}/smart-route/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: s,
      destination: d,
      area: "Bhimavaram",
      time: "night"
    })
  }).then(r => r.json());

export const sendSOS = (lat, lon) =>
  fetch(`${BASE}/sos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lon })
  });

export const sendReport = (lat, lon, type) =>
  fetch(`${BASE}/reports/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lon, type })
  });

export const getHeatmap = () =>
  fetch(`${BASE}/heatmap/`).then(r => r.json());
