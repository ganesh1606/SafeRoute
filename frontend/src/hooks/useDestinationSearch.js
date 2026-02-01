import { useState } from "react";

export default function useDestinationSearch() {
  const [results, setResults] = useState([]);

  async function search(q) {
    if (!q) {
      setResults([]);
      return;
    }

    const r = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        q
      )}`
    );

    const d = await r.json();
    setResults(
      d.slice(0, 5).map(x => ({
        name: x.display_name,
        lat: +x.lat,
        lon: +x.lon
      }))
    );
  }

  function clear() {
    setResults([]);
  }

  return { results, search, clear };
}
