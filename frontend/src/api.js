const BASE = "https://saferoute-e6bg.onrender.com";

export async function getSmartRoutes(source, destination) {
  const res = await fetch(`${BASE}/smart-route/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source,
      destination,
      area: "Bhimavaram",
      time: "night"
    })
  });

  return res.json();
}
