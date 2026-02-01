import { useEffect, useRef } from "react";
import L from "leaflet";

export default function MapOnly() {
    const mapEl = useRef(null);

    useEffect(() => {
        const map = L.map(mapEl.current).setView([16.5449, 81.5212], 14);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap",
        }).addTo(map);

        L.marker([16.5449, 81.5212])
            .addTo(map)
            .bindPopup("Leaflet works in React.")
            .openPopup();

        return () => map.remove();
    }, []);

    return <div ref={mapEl} style={{ height: "100vh", width: "100%" }} />;
}
