// src/services/api.js

const BASE_URL = "https://saferoute-e6bg.onrender.com"; 
// ⬆️ replace only if your backend URL changes

export async function fetchRoutes(source, destination, mode) {
  const res = await fetch(`${BASE_URL}/routes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source,
      destination,
      mode,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch routes");
  }

  return res.json();
}

export async function checkDanger(lat, lon) {
  const res = await fetch(`${BASE_URL}/danger-alert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lat, lon }),
  });

  if (!res.ok) {
    return { alert: false };
  }

  return res.json();
}

export async function sendSOS(position) {
  const res = await fetch(`${BASE_URL}/sos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(position),
  });

  return res.json();
}
