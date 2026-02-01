import { useEffect, useRef } from "react";
import L from "leaflet";

export default function MapOnly() {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        // HARD delay so Netlify DOM + CSS are ready
        const timer = setTimeout(() => {
            if (mapInstance.current) return;

            mapInstance.current = L.map(mapRef.current, {
                zoomControl: true,
                attributionControl: true,
            }).setView([16.5449, 81.5212], 14);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap",
                maxZoom: 19,
            }).addTo(mapInstance.current);

            L.marker([16.5449, 81.5212])
                .addTo(mapInstance.current)
                .bindPopup("SafeRoute Map Loaded")
                .openPopup();

            // FORCE resize (Netlify bug fix)
            setTimeout(() => {
                mapInstance.current.invalidateSize();
            }, 300);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            ref={mapRef}
            style={{
                height: "100vh",
                width: "100vw",
                position: "absolute",
                top: 0,
                left: 0,
                background: "#000",
            }}
        />
    );
}
