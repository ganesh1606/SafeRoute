import { useEffect, useState } from "react";

export default function useLiveGPS() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      pos => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
      },
      err => setError(err.message),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 3000
      }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return { location, error };
}
