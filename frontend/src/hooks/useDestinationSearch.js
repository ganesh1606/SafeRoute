import { useState } from "react";

export default function useDestinationSearch() {
  const [results, setResults] = useState([]);

  async function search(query) {
    if (!query) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );

    const data = await res.json();

    setResults(
      data.slice(0, 5).map(p => ({
        name: p.display_name,
        lat: parseFloat(p.lat),
        lon: parseFloat(p.lon)
      }))
    );
  }

  return { results, search };
}
