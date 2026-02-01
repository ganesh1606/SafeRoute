export async function checkDanger(lat, lon) {
  const res = await fetch("http://localhost:8000/danger-alert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lon }),
  });
  return res.json();
}

export async function reroute(source, destination, mode) {
  const res = await fetch("http://localhost:8000/reroute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, destination, mode }),
  });
  return res.json();
}
