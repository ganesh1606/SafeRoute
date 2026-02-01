export async function searchPlaces(query) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
  );
  const data = await res.json();

  return data.map(p => ({
    label: p.display_name,
    lat: Number(p.lat),
    lon: Number(p.lon),
  }));
}
