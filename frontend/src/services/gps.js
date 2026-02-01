export function startGPS(onUpdate) {
  if (!navigator.geolocation) return;

  navigator.geolocation.watchPosition(
    pos => {
      onUpdate({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        heading: pos.coords.heading || 0,
        speed: pos.coords.speed || 1.4, // m/s
      });
    },
    err => console.error(err),
    { enableHighAccuracy: true }
  );
}
