const API = "http://localhost:8000";

export const getRoute = (s, d) =>
  fetch(`${API}/navigate/`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({source:s, destination:d})
  }).then(r=>r.json());

export const getHeatmap = () =>
  fetch(`${API}/heatmap/`).then(r=>r.json());

export const checkAlert = (loc) =>
  fetch(`${API}/alerts/`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(loc)
  }).then(r=>r.json());

export const sendSOS = (loc) =>
  fetch(`${API}/sos/`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(loc)
  });
