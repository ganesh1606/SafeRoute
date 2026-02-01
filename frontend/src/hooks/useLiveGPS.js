import { useEffect, useState } from "react";

export default function useLiveGPS() {
  const [location, setLocation] = useState({
    lat: 16.545,
    lon: 81.521
  });

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      pos =>
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }),
      () => {},
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return location;
}
